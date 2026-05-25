import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true
});

likeSchema.index({ postId: 1, userId: 1 }, { unique: true })

const likeModel = mongoose.model("like", likeSchema)
export default likeModel;