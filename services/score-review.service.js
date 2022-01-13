const scoreReviewModel = require("../model/score-review.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");
const notificationModel = require("../model/notification.model");
const commonModel = require("../model/common.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const fail = helper.getFailResponse;
const success = helper.getSuccessResponse;

module.exports = {
  async createScoreReview(score_id, expected_point, reason) {
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

    const allTeachersAndHost = await commonModel.findAllTeacherByAssignment(
      score.assignment_category_id
    );

    const { student_id, assignment_name, course_name } =
      await commonModel.getContentOfScoreCreated(score.id);

    for (const user of allTeachersAndHost) {
      await notificationModel.add(
        user.user_id,
        `Sinh viên có mã số ${student_id} đã tạo yêu cầu review cột điểm ${assignment_name} của khóa học ${course_name}`
      );
    }

    return success(score_review);
  },
};
