import mongoose from "mongoose"
import  Jwt  from 'jsonwebtoken';

const DoctorSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true },
  name: {type: String, required: true },
  phone: {type: Number },
  photo: {type: String },
  ticketPrice: {type: Number },
  role: {type: String,},

  // Fields for doctors only
  specialization: {type: String },
  qualifications: {type: Array,},
  experiences: {type: Array,},
  bio: {type: String, maxLength: 50 },
  about: {type: String },
  timeSlots: {type: Array },
  reviews: [{type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {type: Number, default: 0,},
  totalRating: {type: Number, default: 0,},
  isApproved: {type: String, enum: ["pending", "approved", "cancelled"], default: "pending"},
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
})

// Instance method for generating a JWT token
DoctorSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    name: this.name,
    role: this.role
  }

  return Jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '6h'})
}





export default mongoose.model("Doctor", DoctorSchema)
