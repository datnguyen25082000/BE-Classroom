const scoreReviewModel = require("../model/score-review.model");
const studentModel = require("../model/course-students.model");
const userModel = require("../model/user.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const fail = helper.getFailResponse;
const success = helper.getSuccessResponse;

module.exports = {
  async createScoreReview(current_user_id, score_id, expected_point, reason) {
    const score = await scoreModel.getById(score_id);
    if (!score) {
      return fail(error.SCORE_ID_NOT_EXIST);
    }

    const assignment = await assignmentCategoryModel.single(
      score.assignment_category_id
    );

    if (!assignment || !assignment.isFinalized) {
      return fail(error.ASSIGNMENT_CATEGORY_NOT_FINALIZED_YET);
    }

    const existScoreReview = await scoreReviewModel.getByScoreId(score.id);

    if (existScoreReview) {
      return fail(
        error.SCORE_REVIEW_OF_THIS_STUDENT_FOR_THIS_ASSIGNMENT_ALREADY_EXIST
      );
    }

    const score_review = {
      score_id,
      expected_point,
      reason,
    };
    const result = await scoreReviewModel.add(score_review);
    score_review.id = result.insertId;

    return success(score_review);
  },
};
