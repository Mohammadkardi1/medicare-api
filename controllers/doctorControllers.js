import doctorSchema from '../models/doctorSchema.js'


export const fetchDoctors = async (req, res) => {

    const { query } = req.query
    let retrievedDoctors 

    try {

        if (query) {
            retrievedDoctors = await doctorSchema.find({
                isApproved: "approved",
                $or: [{name: {$regex: query, $options: "i"}}, {specialization: {$regex: query, $option: "i"}}]
            }).select("-password")
        } else {
            retrievedDoctors = await doctorSchema.find({isApproved: "approved"}).select("-password")
        }

        if (retrievedDoctors.length === 0 ) {
            return res.status(404).json({success: true, message: "Doctors Not Found", })
        }

        return res.status(200).json({success: true, message: "The doctors' documents have been retrieved Successfully.", data: retrievedDoctors})

    } catch (error) {
        console.error("Error fetching doctors:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

// fetchDoctorById
export const fetchDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const doctor = await doctorSchema.findById(doctorID).populate("reviews").select("-password")

        if (!doctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }

        return res.status(200).json({success: true, message: "The doctor document has been retrieved Successfully.", data: doctor})

    } catch (error) {
        console.error("Error fetching doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}


export const deleteDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const deletedDoctor = await doctorSchema.findByIdAndDelete(doctorID)

        if (!deletedDoctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }

        return res.status(200).json({success: true, messsage: "The doctor document has been deleted Successfully."})
    } catch (error) {
        console.error("Error deleting doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}


export const updateDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const updateDoctor = await doctorSchema.findByIdAndUpdate(doctorID, {$set: req.body}, {new: true}).select('-password')

        if (!updateDoctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }

        return res.status(200).json({success: true, message: "The doctor document has been updated Successfully.", data: updateDoctor})

    } catch (error) {
        console.error("Error updating doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}