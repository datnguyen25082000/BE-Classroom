const express = require("express");
const router = express.Router();
const scoreReviewController = require("../controllers/score-review.controller");

router.post("/create", scoreReviewController.createScoreReview);
router.get(
  "/get-all-by-course",
  scoreReviewController.getAllScoreReviewByCourse
);
router.get("/get-all-by-user", scoreReviewController.getAllByUser);
router.post("/finalize", scoreReviewController.finalizeScoreReview);

module.exports = router;
