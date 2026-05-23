import express from 'express'
import multer from 'multer'
import { protectedRoute } from '../middleware/auth.middleware.js'
import {createPostController, detailsPostController, getPostController } from '../controllers/post.controller.js'

const upload = multer({ storage: multer.memoryStorage() }) // we use memory storage for temprory storing the data
const postRouter = express.Router()

// Prefix - "/api/post"

// route for creating post
postRouter.post("/create-post", protectedRoute, upload.single("image"), createPostController)
// route for getting post
postRouter.get("/get-post", protectedRoute, getPostController)
//route for getting post details , check wheater post belongs to the logged user or not
postRouter.post("/details-post/:postId", protectedRoute, detailsPostController)
export default postRouter