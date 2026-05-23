import { ENV } from "../config/env.js"
import jwt from "jsonwebtoken"
import userModel from "../models/auth.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: "Unauthorized , No Token Provided" })

        const decoded = jwt.verify(token, ENV.JWT_SECRET)

        if (!decoded) return res.status(401).json({ message: "Invalid User Token " })

        const user = await userModel.findById(decoded.userId).select("-password");

        if (!user) return res.status(401).json({ message: "User Not Found" })

        req.user = user;

        next()
    }
    catch (error) {
        console.log(error);

        return res.status(401).json({
            message: error.message
        });
    }

}