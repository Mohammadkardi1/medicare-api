import express from 'express'
import { deletePatient, fetchPatients, fetchPatient, updatePatient } from '../controllers/patientController.js'
import { verifyToken } from '../auth/verifyToken.js'
import { restrict } from '../auth/restrictAccess.js'


const router = express.Router()


// restrict access to admin only: restrict(["doctor"])


// Defines routes for handling patient-related operations
router.get('/fetchPatients', fetchPatients)


router.get('/fetchPatient/:patientId', verifyToken, fetchPatient)  // Here we should restrict to only admin
router.delete('/deletePatient/:patientId', deletePatient)         // restrict for only patient
router.patch('/updatePatient/:patientId', updatePatient)           // restrict for only patient

export default router