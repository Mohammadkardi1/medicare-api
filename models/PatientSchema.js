import mongoose from "mongoose"
import Jwt  from 'jsonwebtoken'

const PatientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // phone: { type: Number },
  photo: { type: String },
  role: {type: String, enum: ["patient", "admin"], default: "patient"},
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  verified: { type: booolean, default: false},
})


// Instance method for generate a JWT token
PatientSchema.methods.generateToken = function () {
  const payload = {
      id: this._id, 
      name: this.name, 
      role: this.role
    }

  return Jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '6h'})
}



export default mongoose.model("Patient", PatientSchema)
