import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const conn = mongoose.connect(ENV.MONGO_URL)
            .then(() => { console.log("Database Connected successfully") })
    } catch (error) {
        console.error("Database Connection Failed", error);

    }
}