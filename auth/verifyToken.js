import jwt from 'jsonwebtoken'
import PatientSchema from '../models/PatientSchema.js'
import DoctorSchema from '../models/DoctorSchema.js'



export const verifyToken = (req, res, next) => {

    const token = req.header('authorization')?.replace('Bearer ', '')
  
    if (!token) {
        return res.status(401).json({success: false, message: 'No token provided, authorization denied.' })
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        next()

    } catch (error) {
        // 401 Unauthorized
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({success: false, message: "Expired token."})
        }
        return res.status(401).json({success: false, message: 'Invalid token.' })
    }
  }



export const restrict = roles => async (req, res, next) => {

    try {
        const userId = req.userId

        const [patient, doctor] = await Promise.all([
            PatientSchema.findById(userId),
            DoctorSchema.findById(userId)
        ])

        const user = patient || doctor

        if (!user) {
            return res.status(404).json({success: false, message: "User not found."});
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({success: false, message: "You are not authorized."})
        }

        next()

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error. Please try again later."})
    }
}