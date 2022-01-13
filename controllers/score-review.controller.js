const scoreReviewService = require("../services/score-review.service");
const processResult = require("../utils/api-helper").processResult;

module.exports = {
  async createScoreReview(req, res, next) {
    const { user_id } = req.user;

    const result = await scoreReviewService.createScoreReview(
      user_id,
      req.body.score_id,
      req.body.expected_point,
      req.body.reason
    );

    processResult(result, res);
  },
};
