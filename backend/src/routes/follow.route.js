import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { AcceptFollowRequestController, AllPendingFollowRequestController, FollowUserController, RejectFollowRequestController, UnfollowUserController } from '../controllers/follow.controller.js'

const followUserRouter = express.Router()

// Prefix - /api/user

/**
 * @Route for follow the user
 * @description this Route used to follow the request 
 * @access private and  post 
 */
followUserRouter.post("/follow/:userId" , protectedRoute ,FollowUserController)

/**
 * @Route for accept follow request
 * @description this Route used to accept the follow request
 * @access private and put
 */
followUserRouter.put("/follow/accept/:requestId",protectedRoute , AcceptFollowRequestController)

/**
 * @Route for reject follow request
 * @description this Route used to reject the follow request
 * @access private and delete
 */
followUserRouter.delete("/follow/reject/:rejectId",protectedRoute , RejectFollowRequestController)

/**
 * @Route for get all pending follow request
 * @description this Route used to get all pending follow request
 * @access private and get
 */
followUserRouter.get("/follow/pending",protectedRoute , AllPendingFollowRequestController)
/**
 * @route for unfollow the user
 * @description this Route used to unfollow the request 
 * @access private and post 
 */
followUserRouter.delete("/unfollow/:userId" , protectedRoute , UnfollowUserController)
export default followUserRouter