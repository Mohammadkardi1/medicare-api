import mongoose from "mongoose"
import DoctorSchema from "./DoctorSchema.js"

const reviewSchema = new mongoose.Schema(
  {
    doctor: {type: mongoose.Types.ObjectId, ref: "Doctor",},
    patient : {type: mongoose.Types.ObjectId, ref: "Patient",},
    reviewText: {type: String, required: true,},
    rating: {type: Number, required: true, min: 0, max: 5, default: 0,},
  },
  { timestamps: true }
)

// Schema Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "patient",    // Specifies the field in the reviewSchema that references another document.
    select: "name photo"    // Only retrieves the name and photo fields from the related user document, excluding all other fields.
  })
  next()
})


reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  // This points the current review
  const stats = await this.aggregate([
    { $match: { doctor: doctorId } },
    { $group: { _id: "$doctor", numberOfRating: { $sum: 1}, avgRating: { $avg: "$rating"}} }
  ])
  console.log(stats)

  await DoctorSchema.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numberOfRating,
    averageRating: stats[0].averageRating
  })
}

reviewSchema.post("save", function() {
  this.constructor.calcAverageRatings(this.doctor)
})

export default mongoose.model("Review", reviewSchema)
