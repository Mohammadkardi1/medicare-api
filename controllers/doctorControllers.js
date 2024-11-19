import DoctorSchema from '../models/DoctorSchema.js'


export const fetchDoctors = async (req, res) => {

    const { query } = req.query
    let retrievedDoctors 

    try {

        if (query) {
            retrievedDoctors = await DoctorSchema.find({
                isApproved: "approved",
                $or: [{name: {$regex: query, $options: "i"}}, {specialization: {$regex: query, $option: "i"}}]
            }).select("-password")
        } else {
            retrievedDoctors = await DoctorSchema.find({isApproved: "approved"}).select("-password")
        }



        if (retrievedDoctors.length > 0 ) {
            return res.status(200).json({success: true, message: "Successfully retrieved.", data: retrievedDoctors})
        } else {
            return res.status(404).json({success: true, message: "Doctors Not Found", })
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieved."})
    }
}

// fetchDoctorById
export const fetchDoctor = async (req, res) => {
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
        const updateDoctor = await DoctorSchema.findByIdAndUpdate(doctorId, {$set: req.body}, {new: true}).select('-passwoed')


        if (updateDoctor) {
            return res.status(200).json({success: true, message: "Successfully updated.", data: updateDoctor})
        } else {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to update."})
    }
}