import reviewSchema from '../models/ReviewSchema.js'
import doctorSchema from '../models/DoctorSchema.js'


export const fetchReviews = async (req, res) => {


    try {
        const reviews = await reviewSchema.find({}) 

        if (reviews.length > 0) {
            res.status(200).json({success: true, message: "Successfully retrieved.", data: reviews})
        } else {
            return res.status(404).json({success: false, message: "Reviews Not Found."})
        }

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retrieved."})
    }
}


