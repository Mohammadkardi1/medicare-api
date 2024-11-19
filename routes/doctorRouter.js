import express from 'express'
import { fetchDoctors, fetchDoctor, deleteDoctor, updateDoctor } from './../controllers/doctorControllers.js';

const router = express.Router()


// Define routes for handling doctor-related operations 
router.get('/fetchDoctors', fetchDoctors)
router.get('/fetchDoctor/:doctorId', fetchDoctor)
router.delete('/deleteDoctor/:doctorId', deleteDoctor)
router.patch('/updateDoctor/:doctorId', updateDoctor)



export default router