import express from 'express'
import userModel from "../models/auth.model.js"
import { UserLogin, UserRegister } from '../controllers/auth.controller.js';
const authRoter = express.Router()

authRoter.post('/signup', UserRegister)
authRoter.post('/login', UserLogin)

export default authRoter;