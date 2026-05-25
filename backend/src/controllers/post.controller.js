import ImageKit, { toFile } from "@imagekit/nodejs"
import postModel from "../models/post.model.js";
import likeModel from "../models/like.model.js";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PUBLIC_KEY
})

export const createPostController = async (req, res) => {

    const BufferFile = req.file;
    const caption = req.body.caption;

    if (!caption) return res.status(400).json({ message: "Please Write Caption" })
    if (!BufferFile) return res.status(400).json({ message: "Please Select Post" })

    //user id taken from token 
    const token = req.user._id

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(BufferFile.buffer), "file"),
        fileName: "file"
    })

    const Post = await postModel.create({
        caption: caption,
        image: file.url,
        author: token
    })


    return res.status(201).json({ message: "Post Created Successfully", file, Post })
}

export const getPostController = async (req, res) => {
    const userId = req.user._id

    const post = await postModel.find({
        author: userId
    })

    if (post.length < 1) return res.status(200).json({ message: "No Post Unvailable" });
    return res.status(200).json({ message: "Post Fetch Successfully", post })
}

export const detailsPostController = async (req, res) => {
    const postId = req.params.postId;
    if (!postId) return res.status(400).json({ message: "Post Id Required" })

    const userId = req.user._id;
    if (!userId) return res.status(400).json({ message: "User Id Required" })

    const Post = await postModel.findById(postId)
    if (!Post) return res.status(404).json({ message: "Post Not Found" })

    const CheckUserBelongsPost = Post.author.toString() === userId.toString()

    if (!CheckUserBelongsPost) return res.status(403).json({ message: "Forbidden Content" })

    return res.status(200).json({ mesage: "post founded", Post })

}

export const likePostController = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    if (!postId) return res.status(400).json({ message: "Post Id Required" })
    if (!userId) return res.status(400).json({ message: "User Id Required" })

    const Post = await postModel.findById(postId);
    if (!Post) return res.status(404).json({ message: "Post Not Found" })

    const AlreadyLiked = await likeModel.findOne({
        postId: postId,
        userId: userId
    })
    if(AlreadyLiked) return res.status(400).json({message : "Post Alredy Liked"})
    const Like = await likeModel.create({
        postId: postId,
        userId: userId
    });


    return res.status(201).json({ message: "Post Liked" }, Post, Like)
}