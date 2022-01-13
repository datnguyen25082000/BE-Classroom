const scoreReviewService = require("../services/score-review.service");
const processResult = require("../utils/api-helper").processResult;

module.exports = {
  async createScoreReview(req, res, next) {
    const result = await scoreReviewService.createScoreReview(
      req.body.score_id,
      req.body.expected_point,
      req.body.reason
    );

    processResult(result, res);
  },

  async getAllScoreReviewByCourse(req, res, next) {
    const result = await scoreReviewService.getAllReviewRequest(
      req.query.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },
};
