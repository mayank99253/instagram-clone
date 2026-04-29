// start your server
import { app } from '../backend/src/app.js'
import { connectDB } from './src/config/db.js';
import { ENV } from './src/config/env.js'

const PORT = ENV.PORT;

if(!PORT){
    console.log("PORT is Unavailable")
}

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running on PORT ${PORT}`)
})