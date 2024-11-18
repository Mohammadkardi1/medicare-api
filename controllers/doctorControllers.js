import DoctorSchema from '../models/DoctorSchema.js'


export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorSchema.find().select('-password')

        if (doctors.length > 0 ) {
            return res.status(200).json({success: true, message: "Successfully retrieved.", data: doctors})
        } else {
            return res.status(404).json({success: true, message: "Doctors Not Found", })
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieved."})
    }
}


export const getSingleDoctor = async (req, res) => {
    const doctorId = req.params.doctorId
    try {
        const doctor = await DoctorSchema.findById(doctorId).select("-password")

        if (doctor) {
            return res.status(200).json({success: true, message: "Successfully retrieved", data: doctor})
        } else {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieved."})
    }
}


export const deleteDoctor = async (req, res) => {
    const doctorId = req.params.doctorId
    try {
        await DoctorSchema.findByIdAndDelete(doctorId)

        return res.status(200).json({success: true, messsage: "Successfully deleted."})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to delete."})
    }
}


export const updateDoctor = async (req, res) => {

    const doctorId = req.params.doctorId
    try {
        const updateDoctor = await DoctorSchema.findByIdAndUpdate(doctorId, {$set: req.body}, {rew: true}).select('-passwoed')


        if (updateDoctor) {
            return res.status(200).json({success: true, message: "Successfully updated.", data: updateDoctor})
        } else {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to update."})
    }
}