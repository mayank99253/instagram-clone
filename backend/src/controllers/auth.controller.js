import { generateToken } from "../config/utils.js";
import userModel from "../models/auth.model.js";
import bcrypt from 'bcrypt'

export const UserRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email?.trim() || !username?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All Fields are Required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const normalizedEmail = email.toLowerCase()
        const isEmailExists = await userModel.findOne({ email: normalizedEmail })

        if (isEmailExists) {
            return res.status(409).json({ message: "Email Already Exist" })
        }



        const saltRounds = 12
        const hashPassword = await bcrypt.hash(password, saltRounds)


        const user = await userModel.create({
            username,
            email: normalizedEmail,
            password: hashPassword,
        })

        generateToken(user._id , res)

        return res.status(201).json({
            message: "User Account Created",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const UserLogin = async (req, res) => {
    try {
        const { email , password } = req.body;

        if(!email?.trim() || !password){
            return res.status(400).json({message :"All Fields are Required"})
        }

        const normalizedEmail = email.toLowerCase()
        
        const user = await userModel.findOne({email : normalizedEmail})
        if(!user) return res.status(401).json({message :"Invalid email or password"})

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid email or password"});

        generateToken(user._id , res)

        return res.status(200).json({message : "User Logged In"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}