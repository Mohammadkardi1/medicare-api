import mongoose from "mongoose"
import DoctorSchema from "./doctorSchema.js"

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


reviewSchema.statics.calcAverageRatings = async function (doctorID) {
  const stats = await this.aggregate([
    { $match: { doctor: doctorID } }, 
    
    { $group: { 
      _id: "$doctor",  // creates a field called numberOfRating
      numberOfRating: { $sum: 1}, 
      avgRating: { $avg: "$rating"}  
    } }
  ])


  if (stats.length > 0) {
    await DoctorSchema.findByIdAndUpdate(doctorID, {
      totalRating: stats[0].numberOfRating,
      averageRating: stats[0].avgRating
    })
  } else {
    // If there are no reviews left, set default values
    await DoctorSchema.findByIdAndUpdate(doctorID, {
      totalRating: 0,
      averageRating: 0
    })
  }


}

reviewSchema.post("save", async function() {
  await this.constructor.calcAverageRatings(this.doctor)
})


reviewSchema.post("findOneAndDelete", async function () {
  await this.constructor.calcAverageRatings(doc.doctor);
})



export default mongoose.model("Review", reviewSchema)
