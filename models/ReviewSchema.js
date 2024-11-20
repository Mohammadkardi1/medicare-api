import mongoose from "mongoose"

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

export default mongoose.model("Review", reviewSchema)
