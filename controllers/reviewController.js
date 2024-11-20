import DoctorSchema from '../models/DoctorSchema.js'
import ReviewSchema from '../models/ReviewSchema.js'
import reviewSchema from '../models/ReviewSchema.js'


export const fetchReviews = async (req, res) => {

    try {
        const retrievedreviews = await reviewSchema.find({}) 

        if (reviews.length === 0) {
            return res.status(404).json({success: false, message: "Reviews Not Found."})
        } 


        return res.status(200).json({success: true, message: "The reviews have been retrieved Successfully.", data: retrievedreviews})

    } catch (error) {
        console.error("Error fetching reviews:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}



export const submitReview = async (req, res) => {

    try {

        if (!req.body.doctorId) req.body.doctorId = req.params.doctorId
        if (!req.body.patientId) req.body.patientId = req.patientId  // This value created through verify token procedure
    
        const submitedReview = new ReviewSchema(req.body)


        if (!req.body.doctorId || !req.body.patientId) {
            return res.status(400).json({success: false, message: "Doctor and patient information are required to submit a review."})
        }

        const savedReview = await submitedReview.save()

        await DoctorSchema.findByIdAndUpdate(req.body.doctorId, {
            $push: {reviews: savedReview._id}
        })

        
        return res.status(201).json({success: true, message: "The review has been submited successfully.", data: savedReview})


    } catch (error) {
        console.error("Error adding review:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

