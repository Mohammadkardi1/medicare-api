import express from "express"
import { submitReview, fetchReviews } from './../controllers/reviewController.js';
import { verifyToken } from '../auth/verifyToken.js';

const router = express.Router({mergeParams: true})

// router.get('/fetchReviews', fetchReviews)
// router.post('/submitReview', submitReview)



// doctor/doctorId/review/reviewId
router 
    .route("/")
    .get(fetchReviews)
    .post(verifyToken, submitReview)   // post(authenticate, restrict(["patient"]), submitReview)


export default router