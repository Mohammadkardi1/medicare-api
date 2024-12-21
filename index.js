import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import patientRouter from './routes/patientRouter.js'
import doctorRouter from './routes/doctorRouter.js'
import reviewRouter from './routes/reviewRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const CONNECTION_URL = process.env.MONGO_URL



// ['http://localhost:5173', 'https://airbnb-clinet.vercel.app'] 
const corsOptions = {
    credentials: true,
    origin: '*' 
}

 

// Connect to MongoDB
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try{
        await mongoose.connect(CONNECTION_URL)
        console.log('MongoDB database is connected')
    } catch(err) {
        console.log('Failed to connect to the MongoDB database')
    }
}


// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))




// Define routes for endpoints
app.use('/api/auth', authRouter)
app.use('/api/patient', patientRouter)
app.use('/api/doctor', doctorRouter)


app.get('/', (req, res) => {
    res.status(200).send('API is running!');
  });



// Start the server
// app.listen(port, () => {
//     connectDB()
//     console.log("Server is running on port " + port)
// })


// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  
  startServer()