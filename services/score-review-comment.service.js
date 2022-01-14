const scoreReviewModel = require("../model/score-review.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");
const notificationModel = require("../model/notification.model");
const commonModel = require("../model/common.model");
const courseJoinModel = require("../model/course-join.model");
const scoreReviewCommentModel = require("../model/score-review-comment.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const userRoleConstant = require("../constants/user-role.constant");
const fail = helper.getFailResponse;
const success = helper.getSuccessResponse;

module.exports = {
  async addComment(
    score_review_id,
    content,
    current_user_id,
    current_user_student_id
  ) {
    const scoreReview = await scoreReviewModel.getById(score_review_id);
    if (!scoreReview) {
      return fail(error.SCORE_REVIEW_ID_NOT_EXIST);
    }

    const havePermission = await isStudentCreateReviewOrTeachersOfCourse(
      score_review_id,
      current_user_id,
      current_user_student_id,
      scoreReview.score_id
    );

    if (!havePermission) {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    const comment = {
      score_review_id,
      created_by: current_user_id,
      created_at: new Date(),
      content,
    };

    const result = await scoreReviewCommentModel.add(comment);

    return success({ ...comment, id: result.insertId });
  },
};

const isStudentCreateReviewOrTeachersOfCourse = async (
  scoreReviewId,
  currentUserId,
  currentUserStudentId,
  scoreId
) => {
  const studentId = await commonModel.getStudentIdByScoreReviewId(
    scoreReviewId
  );
  if (studentId === currentUserStudentId) {
    return true;
  }

  const teachers = await commonModel.findAllTeacherByScoreId(scoreId);
  if (
    teachers &&
    teachers.findIndex((x) => x.user_id === currentUserId) !== -1
  ) {
    return true;
  }

  return false;
};
