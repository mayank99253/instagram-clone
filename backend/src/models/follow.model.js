import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,

    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    }
}, {
    timestamps: true
});

/**
 * @Index = creates a compound unique index in MongoDB.
 * @description - Ensure that same person can not follow the one user multiple time 
 */
followSchema.index({ followee: 1, following: 1 }, { unique: true })

const followmodel = mongoose.model("follow", followSchema)

export default followmodel;