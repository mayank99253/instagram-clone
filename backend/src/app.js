// create Server
import express from 'express'
import authRoter from './routes/auth.router.js'

export const app = express()

app.use(express.json())

app.use("/api/auth",authRoter)

