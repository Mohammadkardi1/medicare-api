import express from 'express'
import { fetchDoctors, fetchDoctor, deleteDoctor, updateDoctor } from './../controllers/doctorControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';
import reviewRouter from './reviewRouter.js';
import {restrictAccess} from '../middleware/restrictAccess.js'

const router = express.Router()

// nested route
router.use('/:doctorId/review', reviewRouter)

// Define routes for handling doctor-related operations 
router.get('/fetchDoctors', verifyToken, fetchDoctors)  // here add a verify token and restrict access 
router.get('/fetchDoctor/:doctorId', verifyToken, fetchDoctor)
router.delete('/deleteDoctor/:doctorId', verifyToken, deleteDoctor) // restrict for noly doctor. Also the admin should has the permission to delete
router.patch('/updateDoctor/:doctorId', verifyToken, restrictAccess(["doctor"]), updateDoctor) // restrict for only doctor. Also the admin should has the permission to update



export default router