import express from 'express'
import { register, login } from '../controllers/authController.js'


const router = express.Router()

// Defines routes for handling authentication-related operations
router.post('/register', register)
router.post('/login', login)


export default router