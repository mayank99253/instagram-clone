// create Server
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoter from './routes/auth.router.js'
import postRouter from './routes/post.route.js'
import followUserRouter from './routes/follow.route.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())

/** 
* @Router for auth
* @Description - This route is used for authentication
* @Access - Public
* @Method - POST
 */
app.use("/api/auth", authRoter)

/**
* @Router for post
* @Description - This route is used for post
* @Access - Private
* @Method - POST, GET
 */
app.use("/api/post", postRouter)

/**
* @Router for user followee and Follower
*  @Description - This route is used for check user is followee or Follower
* @Access - Private
*@method - Post  
 */
app.use("/api/user", followUserRouter)

