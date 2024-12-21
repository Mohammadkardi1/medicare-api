import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import authRouter from './routes/authRouter.js'
// import patientRouter from './routes/patientRouter.js'
// import doctorRouter from './routes/doctorRouter.js'


const app = express()

dotenv.config()

const PORT = process.env.PORT || 8000
const CONNECTION_URL = process.env.MONGO_URL


// ['http://localhost:5173', 'https://airbnb-clinet.vercel.app'] 
// Middleware
app.use(cors({
    credentials: true,
    origin: '*' 
}))
app.use(cookieParser())
app.use(express.json())



// Define routes for endpoints
// app.use('/api/auth', authRouter)
// app.use('/api/patient', patientRouter)
// app.use('/api/doctor', doctorRouter)


app.get('/', (req, res) => {
    res.status(200).json({message: 'API is running!'});
  });



// Connect to MongoDB
// mongoose.set('strictQuery', false)
// const connectDB = async () => {
//     try{
//         await mongoose.connect(CONNECTION_URL)
//         console.log('MongoDB database is connected')
//     } catch(err) {
//         console.log('Failed to connect to the MongoDB database')
//     }
// }

// Start Server
// const startServer = async () => {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   }
  
// startServer()



// Start the server
// app.listen(port, () => {
//     connectDB()
//     console.log("Server is running on port " + port)
// })





mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => {
        console.log(error.message)
    })


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})