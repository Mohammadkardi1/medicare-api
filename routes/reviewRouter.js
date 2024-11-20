import express from "express"
import { submitReview, fetchReviews } from './../controllers/reviewController.js';

const router = express.Router({mergeParams: true})

// router.get('/fetchReviews', fetchReviews)
// router.post('/submitReview', submitReview)


router 
    .route("/")
    .get(fetchReviews)
    .post(submitReview)   // post(authenticate, restrict(["patient"]), submitReview)


export default router