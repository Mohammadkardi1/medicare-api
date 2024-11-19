import PatientSchema from '../models/PatientSchema.js'


export const fetchPatients = async (req, res) => {
    try {
        const patients = await PatientSchema.find().select("-password")

        if (patients.length > 0) {
            return res.status(200).json({success: true, message: "Successfully retrieved.", data: patients})
        } else {
            return res.status(404).json({success: true, message: "Patients Not Found."})
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieve."})
    }
}

// fetchPatientById
export const fetchPatient = async (req, res) => {
    const patientId = req.params.patientId
    try {
        const patient = await PatientSchema.findById(patientId).select("-password")

        if (patient) {
            return res.status(200).json({success: true, message: "Successfully retrieved.", data: patient})
        } else {
            return res.status(404).json({success: true, message: "Patient Not Found."})
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieve."})
    }
}

export const deletePatient = async (req, res) => {
    const patientId = req.params.patientId
    try {
        await PatientSchema.findByIdAndDelete(patientId)

        return res.status(200).json({success: true, messsage: "Successfully deleted."})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to delete."})
    }
}



export const updatePatient = async (req, res) => {
    const patientId = req.params.patientId 

    try {
        const updatedPatient = await PatientSchema.findByIdAndUpdate(patientId, {$set: req.body}, {new: true}).select("-password")

        if (updatedPatient) {
            return res.status(200).json({success: true, message: "Successfully updated.", data: updatedPatient})
        } else {
            return res.status(404).json({success: true, message: "Patient Not Found."})
        }

    } catch (error) {
        return req.status(500).json({success: false, message: "Failed to update."})
    }
}