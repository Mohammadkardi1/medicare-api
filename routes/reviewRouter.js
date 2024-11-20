import express from "express"
import { addReview, fetchReviews } from './../controllers/reviewController.js';

const router = express.Router()

router.get('/fetchReviews', fetchReviews)
router.post('/addReview', addReview)


export default router