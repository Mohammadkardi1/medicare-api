import patientModel from '../models/patientModel.js'
import doctorModel from '../models/doctorModel.js'

export const restrictAccess = roles => async (req, res, next) => {

    try {
        const userId = req.userId
        const [patient, doctor] = await Promise.all([
            patientModel.findById(userId),
            doctorModel.findById(userId)
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
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}