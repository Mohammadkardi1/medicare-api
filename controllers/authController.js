import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    const {name, email, passwoed, role, gender, photo } = req.body

    try {

        let user = null 
        if (role === 'patient') {
            user = User.findOne({email})
        } else if (role === 'doctor') {
            user = Doctor.findOne({email})
        }

        // check if user exist
        if (user) {
            return res.status(400).json({message: "User already exist"})
        }


        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                role,
                gender,
                photo
            })
        }

        res.status(200).json({message: 'You are registered in successefully'})

    } catch (error) {
        res.status(400).json({message: "Something went wrong"})
    }
}

export const login = async (req, res) => {
    try {
        res.status(200).json({message:"You are successfully loged in"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})

    }
}