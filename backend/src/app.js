// create Server
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoter from './routes/auth.router.js'
import postRouter from './routes/post.route.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoter)
app.use("/api/post", postRouter)

