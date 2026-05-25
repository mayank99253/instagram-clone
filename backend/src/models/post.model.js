import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    caption :{        
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    like : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ],
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :"post"
        }
    ],
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    
},{timestamps : true})

const postModel = mongoose.model("post" , postSchema)

export default postModel


