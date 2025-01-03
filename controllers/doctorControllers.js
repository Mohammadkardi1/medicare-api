import doctorModel from '../models/doctorModel.js'


export const fetchDoctors = async (req, res) => {

    const { query } = req.query
    let retrievedDoctors 
    try {
        if (query) {
            retrievedDoctors = await doctorModel.find({
                isApproved: "approved",
                $or: [{name: {$regex: query, $options: "i"}}, {specialization: {$regex: query, $option: "i"}}]
            }).select("-password")
        } else {
            retrievedDoctors = await doctorModel.find({isApproved: "approved"}).select("-password")
        }

        if (retrievedDoctors.length === 0 ) {
            return res.status(404).json({success: true, message: "Doctors Not Found", })
        }

        return res.status(200).json({success: true, message: "The doctors' documents have been retrieved Successfully.", data: retrievedDoctors})
    } catch (error) {
        console.log("Error fetching doctors:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

export const fetchDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const doctor = await doctorModel.findById(doctorID).populate("reviews").select("-password")
        if (!doctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
        return res.status(200).json({success: true, message: "The doctor document has been retrieved Successfully.", data: doctor})
    } catch (error) {
        console.log("Error fetching doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}


export const deleteDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const deletedDoctor = await doctorModel.findByIdAndDelete(doctorID)

        if (!deletedDoctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
        return res.status(200).json({success: true, messsage: "The doctor document has been deleted Successfully."})
    } catch (error) {
        console.log("Error deleting doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}


export const updateDoctor = async (req, res) => {
    const doctorID = req.params.doctorID
    try {
        const updateDoctor = await doctorModel.findByIdAndUpdate(doctorID, {$set: req.body}, {new: true}).select('-password')

        if (!updateDoctor) {
            return res.status(404).json({success: true, message: "Doctor Not Found."})
        }
        return res.status(200).json({success: true, message: "The doctor document has been updated Successfully.", data: updateDoctor})
    } catch (error) {
        console.log("Error updating doctor:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

export const searchDoctors = async (req, res) => {
    const { doctorName } = req.query
    try {
        if (!doctorName) {
        return res.status(400).json({ success: false, error: "Doctor name is required." });
        }
        const doctors = await doctorModel.find({
        name: { $regex: doctorName, $options: 'i' },
        })
        if (doctors.length === 0) {
        return res.status(404).json({success: false, message: "No Doctor Found." });
        }
        return res.status(200).json({success: true, message: "The doctor document has been retrieved Successfully.", data: doctors})
    } catch (error) {
        console.log("Error search doctor:", error.message)
        return res.status(500).json({success: true, error: "Internal server error. Please try again later." })
    }
}