const express = require("express");
const router = express.Router();
const scoreReviewController = require("../controllers/score-review.controller");

router.post("/create", scoreReviewController.createScoreReview);
router.get(
  "/get-all-by-course",
  scoreReviewController.getAllScoreReviewByCourse
);

module.exports = router;
