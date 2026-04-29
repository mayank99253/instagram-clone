import jwt from "jsonwebtoken"
import { ENV } from "./env.js"

export const generateToken = async (userId, res) => {
    const token = jwt.sign(
        { userId },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: ENV.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token
}