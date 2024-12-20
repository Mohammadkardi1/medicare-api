import mongoose from "mongoose"
import  Jwt  from 'jsonwebtoken';

const doctorSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true },
  name: {type: String, required: true },
  hospital: {type: String, },
  phone: {type: Number },
  photo: {type: String },
  ticketPrice: {type: Number, },
  role: {type: String, default: "patient"},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  totalPatients: {type: Number, },

  // Fields for doctors only
  specialization: {type: String, default: "" },
  qualifications: {type: Array,},
  experiences: {type: Array,},
  bio: {type: String, maxLength: 100, },
  about: {type: String,},
  timeSlots: {type: Array },
  reviews: [{type: mongoose.Types.ObjectId, ref: "Review" }],
  // averageRating: {type: mongoose.Schema.Types.Decimal128,},
  // totalRating: {type: Number,},
  isApproved: {type: String, enum: ["pending", "approved", "cancelled"], default: "approved"},
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  verified: {type: Boolean, default: false},
})

// Instance method for generating a JWT token
doctorSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    name: this.name,
    role: this.role,
    photo: this.photo
  }
  return Jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '6h'})
}




export default mongoose.model("Doctor", doctorSchema)
