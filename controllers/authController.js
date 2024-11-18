import Patient from '../models/PatientSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


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

        res.status(200).json({success: true, message: 'You are successfully registered.'})

    } catch (error) {

        res.status(500).json({success:false, message: "Internal server error, try again"})
    }
}

// API login endpoint
export const login = async (req, res) => {
    try {
        res.status(200).json({message:"You are successfully loged in"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})

    }
}