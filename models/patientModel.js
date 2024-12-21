import mongoose from "mongoose"
import Jwt  from 'jsonwebtoken'

const patientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // phone: { type: Number },
  photo: { type: String },
  role: {type: String, enum: ["patient", "admin"], default: "patient"},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  verified: { type: Boolean, default: false},
})


// Instance method for generate a JWT token
patientSchema.methods.generateToken = function () {
  const payload = {
      id: this._id, 
      name: this.name, 
      role: this.role,
      photo: this.photo
    }

  return Jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '6h'})
}



// export default mongoose.model("Patient", patientSchema)


const patientModel = mongoose.model('Patient', patientSchema)

export default patientModel