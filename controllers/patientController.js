import patientSchema from '../models/patientSchema.js'


export const fetchPatients = async (req, res) => {
    try {
        const patients = await patientSchema.find().select("-password")

        if (patients.length === 0) {
            return res.status(404).json({success: false, message: "Patients Not Found."})
        }

        return res.status(200).json({success: true, message: "The patients' documents have been retrieved Successfully.", data: patients})
    } catch (error) {
        console.error("Error fetching patients:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

// fetchPatientById
export const fetchPatient = async (req, res) => {

    const patientID = req.params.patientID
    try {
        const patient = await patientSchema.findById(patientID).select("-password")

        if (!patient) {
            return res.status(404).json({success: false, message: "Patient Not Found."})
        }

        return res.status(200).json({success: true, message: "The patient document has been retrieved Successfully.", data: patient})

    } catch (error) {
        console.error("Error fetching patient:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

export const deletePatient = async (req, res) => {
    const patientID = req.params.patientID
    try {
        const deletedPatient = await patientSchema.findByIdAndDelete(patientID)

        if (!deletedPatient) {
            return res.status(404).json({success: true, message: "Patient Not Found."})
        }

        return res.status(200).json({success: true, messsage: "The doctor document has been deleted Successfully."})
    } catch (error) {
        console.error("Error deleting patient:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}



export const updatePatient = async (req, res) => {
    const patientID = req.params.patientID 

    try {
        const updatedPatient = await patientSchema.findByIdAndUpdate(patientID, {$set: req.body}, {new: true}).select("-password")

        if (!updatedPatient) {
            return res.status(404).json({success: false, message: "Patient Not Found."})
        }

        return res.status(200).json({success: true, message: "The patient document has been updated Successfully.", data: updatedPatient})


    } catch (error) {
        console.error("Error updating patient:", error.message)
        return req.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}


// export const getMyAppointments = async(req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }