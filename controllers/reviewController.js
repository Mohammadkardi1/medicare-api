import doctorModel from '../models/doctorModel.js'
import reviewModel from '../models/reviewModel.js'


export const fetchReviews = async (req, res) => {

    try {
        const retrievedreviews = await reviewModel.find({}) 

        if (retrievedreviews.length === 0) {
            return res.status(404).json({success: false, message: "Reviews Not Found."})
        } 


        return res.status(200).json({success: true, message: "The reviews have been retrieved Successfully.", data: retrievedreviews})

    } catch (error) {
        console.log("Error fetching reviews:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}



export const submitReview = async (req, res) => {

    if (!req.body.doctor) { req.body.doctor = req.params.doctorID }
    if (!req.body.userId) { req.body.reviewer = req.userId }
    if (!req.body.role) { req.body.reviewerRole = req.role === 'doctor' ? 'Doctor' : 'Patient' }

    try {
        if (!req.body.doctor || !req.body.reviewer || !req.body.reviewerRole) {
            return res.status(400).json({success: false, message: "Doctor and reviewer information are required to submit a review."})
        }

        const submitedReview = new reviewModel(req.body)


        const savedReview = await submitedReview.save()

        const updatedDoctor = await doctorModel.findByIdAndUpdate(req.body.doctor, 
            {$push: {reviews: savedReview._id}}, { new: true }).populate("reviews").select("-password")

        
        return res.status(201).json({success: true, message: "The review has been submited successfully.", data: updatedDoctor})


    } catch (error) {
        console.log("Error adding review:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

