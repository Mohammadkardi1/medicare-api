import express from 'express'
import { register, login, verifyEmail } from '../controllers/authController.js'


const router = express.Router()

// Defines routes for handling authentication-related operations
router.post('/register', register)
router.post('/login', login)
router.get('/:role/:userId/verify/:token', verifyEmail)




export default router