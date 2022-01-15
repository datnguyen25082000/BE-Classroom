const express = require("express");
const router = express.Router();
const scoreReviewCommentController = require("../controllers/score-review-comment.controller");

router.post("/add", scoreReviewCommentController.addComment);

module.exports = router;
