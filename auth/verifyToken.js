import jwt from 'jsonwebtoken'
import DoctorSchema from '../models/DoctorSchema.js'
import PatientSchema from '../models/PatientSchema.js'



// Middleware to verify token
export const verifyToken = (req, res, next) => {

    // Extract token from headers
    const token = req.header('authorization')?.replace('Bearer ', '')
  
    if (!token) {
      return res.status(403).json({success: false, message: 'No token provided, authorization denied.' })
    }
  
    try {
      // Verify token using the secret key
    //   const decoded = jwt.verify(token, JWT_SECRET)
      
      // Attach decoded payload to the request object
    //   req.user = decoded


      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token.' })
    }
  };