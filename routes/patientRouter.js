import express from 'express'
import { deletePatient, getAllPatients, getSinglePatient, updatePatient } from '../controllers/patientController.js'


const router = express.Router()

// Defines routes for handling patient-related operations
router.get('/allPatients', getAllPatients)
router.get('/singlePatient/:patientId', getSinglePatient)
router.delete('/deletePatient/:patientId', deletePatient)
router.patch('/updatePatient/:patientId', updatePatient)

export default router