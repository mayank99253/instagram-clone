import userModel from "../models/auth.model.js";
import followmodel from "../models/follow.model.js";

export const FollowUserController = async (req, res) => {
    const followingId = req.params.userId;
    const followeeId = req.user._id;
    const followeeUsername = req.user.username;

    //checks User Already Follow the User
    const ExistfollowAndFollowing = await followmodel.findOne({
        followee: followeeId,
        following: followingId
    })

    if (ExistfollowAndFollowing) return res.status(400).json({ message: "You are already following this user" })
    
    //Checks User is following Yourself
    if (followingId.toString() === followeeId.toString()) return res.status(400).json({ message: "You can not follow yourself" })

    const followingUser = await userModel.findById(followingId)

    const UserFollowing = await followmodel.create({
        followee : followeeId,
        following: followingId
    });

    return res.status(201).json({message : `${followeeUsername} is following to ${followingUser.username}` , UserFollowing})
}

export const UnfollowUserController = async (req, res) => {
    const followingId = req.params.userId;
    const followeeId = req.user._id;
    const followeeUsername = req.user.username;

    const followingUserName = (await userModel.findById(followingId)).username;

    const FindUserFollowing = await followmodel.findOne({
        followee : followeeId,
        following : followingId
    })

    if(!FindUserFollowing) return res.status(404).json({message : "Followed User Not Found"})

    const UnfollowUser = await followmodel.findByIdAndDelete(FindUserFollowing._id)

    return res.status(200).json({ message: `${followeeUsername} has unfollowed ${followingUserName}`, UnfollowUser })
}