import Patient from '../models/PatientSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = (user) => {
    return Jwt.sign(
        {id: user._id,role: user.role}, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '24h'}
)}

// API register endpoint
export const register = async (req, res) => {
    const {name, email, password, role, gender} = req.body

    try {

        let user = null
        
        if (role === 'patient') {
            user = await Patient.findOne({email})
        } else if (role === 'doctor') {
            user = await Doctor.findOne({email})
        }


        // check if the user exists in Database
        if (user) {
            return res.status(400).json({message: "User already exist"})
        }


        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient') {
            user = new Patient({name, email, password: hashPassword, role, gender})
        }


        if(role === 'doctor') {
            user = new Doctor({name, email, password: hashPassword, role, gender})
        }

        // Save a document
        await user.save()

        return res.status(200).json({success: true, message: 'You are successfully registered.'})

    } catch (error) {

        return res.status(500).json({success:false, message: "Internal server error, try again"})
    }
}

// API login endpoint
export const login = async (req, res) => {
    const {email, password} = req.body

    try {

        let user = null

        const patient = await Patient.findOne({email})
        const doctor = await Doctor.findOne({email})

        if (patient) {
            user = patient
        }

        if (doctor) {
            user = doctor
        }


        // Check if the user exsits in Database
        if (!user) {
            return res.status(404).json({message: "User not found! Please Sign up."})
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({status: false, message: "Invalid credentials."})
        }

        // get toke
        const token = generateToken(user)

        const {password, role, appointments, ...rest} = user._doc

        return res.status(200).json({status: true, message:"Successfully logged in.", token, data:{...rest}, role})
    } catch (error) {
        return res.status(500).json({status: false, message:"Failed to login"})

    }
}