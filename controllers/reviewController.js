import ReviewSchema from '../models/ReviewSchema.js'
import reviewSchema from '../models/ReviewSchema.js'


export const fetchReviews = async (req, res) => {

    try {
        const reviews = await reviewSchema.find({}) 

        if (reviews.length === 0) {
            return res.status(404).json({success: false, message: "Reviews Not Found."})
        } 


        return res.status(200).json({success: true, message: "The reviews have been retrieved Successfully.", data: reviews})

    } catch (error) {
        console.error("Error fetching reviews:", error.message)
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
        console.error("Error adding review:", error.message)
        return res.status(500).json({success: false, message: "Internal server error. Please try again later."})
    }
}

