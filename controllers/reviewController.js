import doctorSchema from '../models/doctorSchema.js'
import reviewSchema from '../models/reviewSchema.js'


export const fetchReviews = async (req, res) => {

    try {
        const retrievedreviews = await reviewSchema.find({}) 

        if (retrievedreviews.length === 0) {
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

        if (!req.body.doctorID) req.body.doctor = req.params.doctorID
        if (!req.body.userId) req.body.patient = req.userId  // This value created through verify token procedure
    



        if (!req.body.doctor || !req.body.patient) {
            return res.status(400).json({success: false, message: "Doctor and patient information are required to submit a review."})
        }

        const submitedReview = new reviewSchema(req.body)


        const savedReview = await submitedReview.save()

        await doctorSchema.findByIdAndUpdate(req.body.doctor, {
            $push: {reviews: savedReview._id}
        })

        
        return res.status(201).json({success: true, message: "The review has been submited successfully.", data: savedReview})


    } catch (error) {
        console.error("Error adding review:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

