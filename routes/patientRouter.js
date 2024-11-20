import express from 'express'
import { deletePatient, fetchPatients, fetchPatient, updatePatient } from '../controllers/patientController.js'
import { verifyToken } from '../auth/verifyToken.js'
import { restrict } from '../auth/restrictAccess.js'


const router = express.Router()


// restrict access to admin only: restrict(["doctor"])


// Defines routes for handling patient-related operations
router.get('/fetchPatients', fetchPatients)


router.get('/fetchPatient/:patientId', verifyToken, fetchPatient)  // Here we should restrict to only admin
router.delete('/deletePatient/:patientId', verifyToken, deletePatient)   // restrict for noly patient. Also the admin should has the permission to delete
router.patch('/updatePatient/:patientId', verifyToken, updatePatient)   // restrict for noly patient. Also the admin should has the permission to update

export default router