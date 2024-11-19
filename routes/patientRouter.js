import express from 'express'
import { deletePatient, fetchPatients, fetchPatient, updatePatient } from '../controllers/patientController.js'
import { verifyToken } from '../auth/verifyToken.js'

const router = express.Router()

// Defines routes for handling patient-related operations
router.get('/fetchPatients', fetchPatients)
router.get('/fetchPatient/:patientId', verifyToken, fetchPatient)
router.delete('/deletePatient/:patientId', deletePatient)
router.patch('/updatePatient/:patientId', updatePatient)

export default router