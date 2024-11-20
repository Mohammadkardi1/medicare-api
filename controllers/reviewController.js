import ReviewSchema from '../models/ReviewSchema.js'
import reviewSchema from '../models/ReviewSchema.js'


export const fetchReviews = async (req, res) => {


    try {
        const reviews = await reviewSchema.find({}) 

        if (reviews.length > 0) {
            res.status(200).json({success: true, message: "Successfully retrieved.", data: reviews})
        } else {
            return res.status(404).json({success: false, message: "Reviews Not Found."})
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}



export const addReview = async (req, res) => {

    const {doctor, patient, reviewText, rating} = req.body


    try {
        const review = new ReviewSchema({doctor, patient, reviewText, rating})


        await review.save()
        return res.status(200).json({success: true, message: "The review has been added successfully."})


    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

