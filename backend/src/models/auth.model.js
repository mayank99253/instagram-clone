import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "Hey , I using Instagram"
    },
    profession: {
        type: String,
        default: "Not Specific"
    },
    profilepic: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
})

const userModel = mongoose.model("user", userSchema)

export default userModel