const express = require("express");
const router = express.Router();
const scoreReviewController = require('../controllers/score-review.controller')

router.post("/create", scoreReviewController.createScoreReview);

module.exports = router;
