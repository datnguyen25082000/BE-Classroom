const scoreReviewModel = require("../model/score-review.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");
const notificationModel = require("../model/notification.model");
const commonModel = require("../model/common.model");
const courseJoinModel = require("../model/course-join.model");
const scoreReviewCommentModel = require("../model/score-review-comment.model");
const userModel = require("../model/user.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const fail = helper.getFailResponse;
const success = helper.getSuccessResponse;

module.exports = {
  async addComment(score_review_id, content, current_user) {
    const scoreReview = await scoreReviewModel.getById(score_review_id);
    if (!scoreReview) {
      return fail(error.SCORE_REVIEW_ID_NOT_EXIST);
    }

    const roleConstant = {
      teacher: "teacher",
      student: "student",
    };
    let role;

    if (
      await isStudentCreateReview(score_review_id, current_user.user_studentid)
    ) {
      role = roleConstant.student;
    } else if (
      await isTeacherOfCourse(scoreReview.score_id, current_user.user_id)
    ) {
      role = roleConstant.teacher;
    } else {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    const comment = {
      score_review_id,
      created_by: current_user.user_id,
      created_at: new Date(),
      content,
    };

    const result = await scoreReviewCommentModel.add(comment);

    if (role === roleConstant.teacher) {
      const result = await commonModel.getStudentIdByScoreReviewId(
        score_review_id
      );
      const student = await userModel.findByStudentId(result[0].student_id);
      await notificationModel.add(
        student.user_id,
        `Giáo viên ${current_user.user_displayname} đã bình luận về yêu cầu sửa điểm của bạn.`
      );
    }

    return success({ ...comment, id: result.insertId });
  },

  async getByScoreReviewId(current_user, score_review_id) {
    const scoreReview = await scoreReviewModel.getById(score_review_id);
    if (!scoreReview) {
      return fail(error.SCORE_REVIEW_ID_NOT_EXIST);
    }

    const roleConstant = {
      teacher: "teacher",
      student: "student",
    };
    let role;

    if (
      await isStudentCreateReview(score_review_id, current_user.user_studentid)
    ) {
      role = roleConstant.student;
    } else if (
      await isTeacherOfCourse(scoreReview.score_id, current_user.user_id)
    ) {
      role = roleConstant.teacher;
    } else {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    const comments = await scoreReviewCommentModel.getByScoreReviewId(
      score_review_id
    );
    return success(comments);
  },
};

const isStudentCreateReview = async (scoreReviewId, currentUserStudentId) => {
  const studentId = await commonModel.getStudentIdByScoreReviewId(
    scoreReviewId
  );
  if (studentId === currentUserStudentId) {
    return true;
  }

  return false;
};

const isTeacherOfCourse = async (scoreId, currentUserId) => {
  const teachers = await commonModel.findAllTeacherByScoreId(scoreId);
  if (
    teachers &&
    teachers.findIndex((x) => x.user_id === currentUserId) !== -1
  ) {
    return true;
  }

  return false;
};
