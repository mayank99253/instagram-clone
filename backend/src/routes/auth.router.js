import express from 'express'
import { togglePrivacyController, UserLogin, UserLogout, UserRegister } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
const authRoter = express.Router()

/**
 * @route POST /api/auth/signup
 * @desc Register a new user
 * @access Public
 */
authRoter.post('/signup', UserRegister)
/**
 * @route POST /api/auth/login
 * @desc Authenticate user and get token
 * @access Public
 */
authRoter.post('/login',  UserLogin)
/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @access Public
 */
authRoter.post('/logout',  UserLogout)
/**
 * @Route PUT /api/auth/private/account
 * @desc Toggle User Account Privacy
 * @access Private
 */
authRoter.put('/private/account',protectedRoute , togglePrivacyController  )




export default authRoter;