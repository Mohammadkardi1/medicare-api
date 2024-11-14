import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const CONNECTION_URL = process.env.MONGO_URL


const corsOptions = {
    origin: true 
}



// Database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try{
        await mongoose.connect(CONNECTION_URL)
        console.log('MongoDB database is connected')
    } catch(err) {
        console.log('Failed to connect to the MongoDB database')
    }
}


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/auth', authRoutes)

// app.get('/', (req, res) => {
//     res.send('API is working')
// })


app.listen(port, () => {
    connectDB()
    console.log("Server is running on port " + port)
})