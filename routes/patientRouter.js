import express from 'express'
import { deletePatient, fetchPatients, fetchPatient, updatePatient } from '../controllers/patientController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import {restrictAccess} from '../middleware/restrictAccess.js'

const router = express.Router()


// restrict access to admin only: restrict(["doctor"])


// Defines routes for handling patient-related operations
router.get('/fetchPatients', verifyToken, restrictAccess(["patient", "doctor"]), fetchPatients)
router.get('/fetchPatient/:patientID', verifyToken, restrictAccess(["patient", "doctor"]), fetchPatient)  // Here we should restrict to only admin
router.delete('/deletePatient/:patientID', verifyToken, restrictAccess(["patient"]), deletePatient)   // restrict for noly patient. Also the admin should has the permission to delete
router.patch('/updatePatient/:patientID', verifyToken, restrictAccess(["patient"]), updatePatient)   // restrict for noly patient. Also the admin should has the permission to update

export default router