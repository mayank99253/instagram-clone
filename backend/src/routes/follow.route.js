import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { FollowUserController, UnfollowUserController } from '../controllers/follow.controller.js'

const followUserRouter = express.Router()

/**
 * @Route for follow the user
 * @description this Route used to follow the request 
 * @access private and  post 
 */
followUserRouter.post("/follow/:userId" , protectedRoute ,FollowUserController)

/**
 * @route for unfollow the user
 * @description this Route used to unfollow the request 
 * @access private and post 
 */
followUserRouter.post("/unfollow/:userId" , protectedRoute , UnfollowUserController)
export default followUserRouter