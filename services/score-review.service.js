const scoreReviewModel = require("../model/score-review.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");
const notificationModel = require("../model/notification.model");
const commonModel = require("../model/common.model");
const courseJoinModel = require("../model/course-join.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const userRoleConstant = require("../constants/user-role.constant");
const userModel = require("../model/user.model");
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

  async getAllReviewRequest(course_id, current_user_id) {
    const courseJoin = await courseJoinModel.single(current_user_id, course_id);
    if (!courseJoin || !isTeacherOrHost(courseJoin.user_role)) {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    const scoreReviews = await commonModel.getAllScoreReviewByCourseIdAndUserId(
      course_id,
      current_user_id
    );
    return success(scoreReviews);
  },

  async getAllRequestByUser(current_user) {
    const requests = await scoreReviewModel.getByStudentId(
      current_user.user_studentid
    );
    return success(requests);
  },

  async getByAssignment(current_user, assignment_category_id) {
    const request = await scoreReviewModel.getByStudentIdAndAssignment(
      current_user.user_studentid,
      assignment_category_id
    );
    return success(request);
  },

  async finalReview(scoreReviewId, updatedPoint, current_user) {
    const teachers = await commonModel.getAllTeachersOfCourseByScoreReviewId(
      scoreReviewId
    );
    if (
      !teachers ||
      !teachers.find((x) => x.user_id === current_user.user_id)
    ) {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    const scoreReview = await scoreReviewModel.getById(scoreReviewId);
    if (scoreReview.isFinalized) {
      return fail(error.SCORE_REVIEW_ALREADY_FINALIZED);
    }

    const score = await scoreModel.getById(scoreReview.score_id);

    await scoreModel.patch({ ...score, point: updatedPoint });
    await scoreReviewModel.patch({ ...scoreReview, isFinalized: true });

    const rows = await commonModel.getStudentIdByScoreReviewId(scoreReviewId);
    const student = await userModel.findByStudentId(rows[0].student_id);
    if (student) {
      await notificationModel.add(
        student.user_id,
        `Giáo viên ${current_user.user_displayname} đã hoàn tất yêu cầu sửa điểm của bạn`
      );
    }

    return success({ ...scoreReview, isFinalized: true, updatedPoint });
  },
};

const isTeacherOrHost = (userRole) => {
  return (
    userRole === userRoleConstant.HOST || userRole === userRoleConstant.TEACHER
  );
};
