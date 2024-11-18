import express from 'express'
import { deletePatient, getAllPatients, getSinglePatient } from '../controllers/patientController.js'


const router = express.Router()

router.get('/allPatients', getAllPatients)
router.get('/singlePatient/:patientId', getSinglePatient)


// http://localhost/api/patient/deletePatient/patientId
router.delete('/deletePatient/:patientId', deletePatient)

export default router