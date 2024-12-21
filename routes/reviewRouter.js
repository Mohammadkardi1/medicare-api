import express from "express"
import { submitReview, fetchReviews } from './../controllers/reviewController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router({mergeParams: true})


router 
    .route("/")
    .get(fetchReviews)
    .post(verifyToken, submitReview)


export default router