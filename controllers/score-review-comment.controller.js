const scoreReviewCommentService = require("../services/score-review-comment.service");
const processResult = require("../utils/api-helper").processResult;

module.exports = {
  async addComment(req, res, next) {
    const result = await scoreReviewCommentService.addComment(
      req.body.score_review_id,
      req.body.content,
      req.user
    );

    processResult(result, res);
  },
};
