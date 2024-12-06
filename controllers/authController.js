import patientSchema from '../models/patientSchema.js'
import doctorSchema from '../models/doctorSchema.js'
import tokenSchema from '../models/tokenSchema.js'
import bcrypt from 'bcryptjs'
import { nameValidator, emailValidator, passwordValidator } from '../utils/validator.js'
import sendEmail from './../utils/sendEmail.js'
import crypto from 'crypto' 



// API register endpoint
export const register = async (req, res) => {


    const {name, email, password, role} = req.body


    if (!name || !email || !password || !role) {
        return res.status(400).json({message:"Required fields are missing"})
    }
    if (!nameValidator(name.trim())) {
        return res.status(400).json({message: 'Name must be alphanumeric at least 4 characters long'})
    }
    if (!emailValidator(email)) {
        return res.status(400).json({message: "Email is not valid"})
    }
    if (!passwordValidator(password)) {
        return res.status(400).json({message: 'Password is not strong enough'})
    }



    try {
        const [patient, doctor] = await Promise.all([
            patientSchema.findOne({email}),
            doctorSchema.findOne({email})
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
        const userModel = role === 'patient' ? patientSchema : role === 'doctor' ? doctorSchema : null

        if (!userModel) {
            return res.status(400).json({ success: false, message: 'Invalid role'})
        }

        user = new userModel({...req.body, name: name.trim(),  password: hashPassword })
        await user.save()



        const verifiedToken = await tokenSchema.create({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		})


        const url = `${process.env.BASE_URL}/api/auth/${user.role}/${user._id}/verify/${verifiedToken.token}`
        const htmlMessage = `
                <div>Hallo ${user.name},</div>
                <div>
                    <br>
                    <P> Please Click on the link to verify your email address: </P>
                    <br>
                    <p>${url}</p>
                </div>`

		await sendEmail(user.email, "Account Verification", htmlMessage)



		return res.status(400).send({ message: "Registration successful! Please check your email to verify your account" })



    } catch (error) {

        return res.status(500).json({success:false, message: "Internal server error. Please try again later"})
    }
}

// API login endpoint
export const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return  res.status(400).json({message: "Required fields are missing."})
    }

    try {

        const [patient, doctor] = await Promise.all([
            patientSchema.findOne({email}),
            doctorSchema.findOne({email})
        ])

        const user = patient || doctor
        

        // Check if the user exsits in Database
        if (!user) {
            return res.status(404).json({success: false, message: "User not found! Please Sign up"})
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({status: false, message: "The password you entered is incorrect"})
        }


        // Generate the token using the instance method
        const token = user.generateToken()


        const {password, role, appointments, ...rest} = user._doc

        return res.status(200).json({status: true, message:"You have been logged in Successfully", token, data:{...rest}, role})
    } catch (error) {
        return res.status(500).json({status: false, message:"Internal server error. Please try again later"})
    }
}




export const verifyEmail = async (req, res) => {
    try {
        const userModel = req.params.role === "doctor" ? doctorSchema : patientSchema
        const existingUser = await userModel.findOne({ _id: req.params.userId })


        
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid or expired token. Please request a new link to proceed." })
        }


        const existingToken = await tokenSchema.findOne({
            userId: req.params.userId,
            token: req.params.token,
        })
        if (!existingToken) {
            return res.status(400).send({ message: "Invalid or expired token. Please request a new link to proceed." })
        }



        await userModel.findByIdAndUpdate(existingUser._id, {verified: true })
        await tokenSchema.findByIdAndDelete(existingToken._id)


        return res.status(200).send({ message: "Email verified successfully! Please Log in." })


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}