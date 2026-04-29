import dotenv from 'dotenv'

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_MODULES,
    MONGO_URL : process.env.MONGO_URL,
    JWT_SECRET : process.env.JWT_SECRET,
}