import Patient from '../models/PatientSchema.js'


export const updateUser = async (req, res) => {
    const id = req.params.id 

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, {$set: req.body}, {new: true})


        return res.status(200).json({success: true, message: "Successfully updated.", data: updatedPatient})
    } catch (error) {
        return req.status(500).json({success: false, message: "Failed to update."})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await Patient.findByidandDelete(id)

        return res.status(200).json({success: true, messsage: "Successfully deleted."})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to delete."})
    }
}

export const getSinglePatient = async (req, res) => {
    const id = req.params.id
    try {
        const patient = await Patient.findById(id)

        return res.status(200).json({success: true, message: "Successfully retrieved.", data: patient})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieve."})
    }
}


export const getAllPatients = async (req, res) => {
    try {
        const patients = Patient.find()

        return res.status(200).json({success: true, message: "Successfully retrieved.", data: patients})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieve."})
    }
}