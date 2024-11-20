import PatientSchema from '../models/PatientSchema.js'
import DoctorSchema from '../models/DoctorSchema.js'
import Jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = (user) => {
    return Jwt.sign(
        {id: user._id, name: user.name, role: user.role},
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '24h'}
)}

// API register endpoint
export const register = async (req, res) => {
    const {name, email, password, role, gender} = req.body

    try {
        const [patient, doctor] = await Promise.all([
            PatientSchema.findOne({email}),
            DoctorSchema.findOne({email})
        ])

        const isUserExists = patient || doctor


        // check if the user exists in Database
        if (isUserExists) {
            return res.status(400).json({message: "User already exist"})
        }


        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        let user = null
        const userModel = role === 'patient' ? PatientSchema : role === 'doctor' ? DoctorSchema : null

        if (!userModel) {
            return res.status(400).json({ success: false, message: 'Invalid role.'})
        }

        user = new userModel({ name, email, password: hashPassword, role, gender })
        await user.save()

        return res.status(201).json({success: true, message: 'You have been registered successfully.'})

    } catch (error) {

        return res.status(500).json({success:false, message: "Internal server error. Please try again later."})
    }
}

// API login endpoint
export const login = async (req, res) => {
    const {email, password} = req.body

    try {

        const [patient, doctor] = await Promise.all([
            PatientSchema.findOne({email}),
            DoctorSchema.findOne({email})
        ])

        const user = patient || doctor
        

        // Check if the user exsits in Database
        if (!user) {
            return res.status(404).json({success: false, message: "User not found! Please Sign up."})
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({status: false, message: "Invalid credentials."})
        }

        // get toke
        const token = generateToken(user)

        const {password, role, appointments, ...rest} = user._doc

        return res.status(200).json({status: true, message:"You have been logged in Successfully.", token, data:{...rest}, role})
    } catch (error) {
        return res.status(500).json({status: false, message:"Internal server error. Please try again later."})
    }
}