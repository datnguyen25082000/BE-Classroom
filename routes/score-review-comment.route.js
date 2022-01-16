const express = require("express");
const router = express.Router();
const scoreReviewCommentController = require("../controllers/score-review-comment.controller");

router.post("/add", scoreReviewCommentController.addComment);
router.get("/get-all-by-score-review", scoreReviewCommentController.getByScoreReviewId)

module.exports = router;
