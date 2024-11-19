import express from 'express'
import { fetchDoctors, fetchDoctor, deleteDoctor, updateDoctor } from './../controllers/doctorControllers.js';

const router = express.Router()


// Define routes for handling doctor-related operations 
router.get('/fetchDoctors', fetchDoctors)  // here add a verify email and restrict access 
router.get('/fetchDoctor/:doctorId', fetchDoctor)
router.delete('/deleteDoctor/:doctorId', deleteDoctor)
router.patch('/updateDoctor/:doctorId', updateDoctor)



export default router