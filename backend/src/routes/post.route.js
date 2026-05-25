import express from 'express'
import multer from 'multer'
import { protectedRoute } from '../middleware/auth.middleware.js'
import {createPostController, detailsPostController, getPostController, likePostController } from '../controllers/post.controller.js'

const upload = multer({ storage: multer.memoryStorage() }) // we use memory storage for temprory storing the data
const postRouter = express.Router()

// Prefix - "/api/post"

/**
 * @Route for creating post
 * @Description - This route is used for creating post
 * @Access - Private
 * @Method - POST
 */
postRouter.post("/create/post", protectedRoute, upload.single("image"), createPostController)

/**
 * @Route for getting post
 * @Description - This route is used for getting post
* @Access - Private
* @Method - GET
*/
postRouter.get("/get/userpost", protectedRoute, getPostController)

/**
 @Route for getting post details
* @Description - This route is used for getting post details
* @Access - Private
* @Method - POST
*/
postRouter.post("/details/post/:postId", protectedRoute, detailsPostController)


/**
 * @Route for like post
 * @Description - This route is used for like post
 * @Access - Private
 * @Method - POST
 */
postRouter.post("/like/post/:postId", protectedRoute, likePostController)

export default postRouter