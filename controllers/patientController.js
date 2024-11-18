import Patient from '../models/PatientSchema.js'


export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()

        return res.status(200).json({success: true, message: "Successfully retrieved.", data: patients})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieve."})
    }
}


export const getSinglePatient = async (req, res) => {
    const patientId = req.params.patientId
    try {
        const patient = await Patient.findById(patientId)

        return res.status(200).json({success: true, message: "Successfully retrieved.", data: patient})
    } catch (error) {
        return res.status(404).json({success: false, message: "Patient Not Found."})
    }
}

export const deletePatient = async (req, res) => {
    const patientId = req.params.patientId
    try {
        await Patient.findByIdAndDelete(patientId)

        return res.status(200).json({success: true, messsage: "Successfully deleted."})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to delete."})
    }
}



// export const updatePatient = async (req, res) => {
//     const patientId = req.params.patientId 

//     try {
//         const updatedPatient = await Patient.findByIdAndUpdate(patientId, {$set: req.body}, {new: true})

//         return res.status(200).json({success: true, message: "Successfully updated.", data: updatedPatient})
//     } catch (error) {
//         return req.status(500).json({success: false, message: "Failed to update."})
//     }
// }








