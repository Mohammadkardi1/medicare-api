import express from 'express'
import { deletePatient, fetchPatients, fetchPatient, updatePatient } from '../controllers/patientController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import {restrictAccess} from '../middleware/restrictAccess.js'

const router = express.Router()

// Defines routes for handling patient-related operations
router.get('/fetchPatients', verifyToken, restrictAccess(["patient", "doctor"]), fetchPatients)
router.get('/fetchPatient/:patientID', verifyToken, restrictAccess(["patient", "doctor"]), fetchPatient)  
router.delete('/deletePatient/:patientID', verifyToken, restrictAccess(["patient"]), deletePatient)  
router.patch('/updatePatient/:patientID', verifyToken, restrictAccess(["patient"]), updatePatient) 

export default router