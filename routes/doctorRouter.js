import express from 'express'
import { fetchDoctors, fetchDoctor, deleteDoctor, updateDoctor, searchDoctors } from './../controllers/doctorControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';
import reviewRouter from './reviewRouter.js';
import {restrictAccess} from '../middleware/restrictAccess.js'

const router = express.Router()

// nested route
router.use('/:doctorID/review', reviewRouter)

// Define routes for handling doctor-related operations 
router.get('/fetchDoctors', fetchDoctors) 
router.get('/fetchDoctor/:doctorID', fetchDoctor)
router.delete('/deleteDoctor/:doctorID', verifyToken, restrictAccess(["doctor"]), deleteDoctor)
router.patch('/updateDoctor/:doctorID', verifyToken, restrictAccess(["doctor"]), updateDoctor)
router.get('/search', searchDoctors)

export default router