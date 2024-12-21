import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    doctor: {type: mongoose.Types.ObjectId, ref: "Doctor", required: true,},
    patient: {type: mongoose.Types.ObjectId, ref: "Patient", required: true,},
    ticketPrice: { type: String, required: true },
    appointmentDate: {type: Date, required: true,},
    status: {type: String, enum: ["pending", "approved", "cancelled"], default: "pending",},
    isPaid: {type: Boolean, default: true,},
  },
  { timestamps: true }
)

// export default mongoose.model("Booking", bookingSchema)


const bookingModel = mongoose.model('Booking', bookingSchema)

export default bookingModel
