const db = require("../utils/db");
const userRoleConstant = require("../constants/user-role.constant");

module.exports = {
  async findAllTeacherByAssignment(assignment_category_id) {
    const rows = await db.load(
      `select users.* from users
        join coursejoin on coursejoin.user_id = users.user_id
        join courses on courses.course_id = coursejoin.course_id
        join assignment_category on assignment_category.course_id = courses.course_id
        where assignment_category.id = '${assignment_category_id}' 
        and (coursejoin.user_role = ${userRoleConstant.HOST} or coursejoin.user_role = ${userRoleConstant.TEACHER})`
    );

    return rows.length > 0 ? rows : null;
  },

  async getContentOfScoreCreated(score_id) {
    const rows = await db.load(
      `SELECT course_students.student_id, assignment_category.name as assignment_name, courses.course_name
        FROM score
        join course_students on course_students.id = score.course_student_id
        join assignment_category on assignment_category.id = score.assignment_category_id
        join courses on courses.course_id = assignment_category.course_id
        where score.id = '${score_id}'`
    );

    return rows.length > 0 ? rows[0] : null;
  },

  async getAllScoreReviewByCourseIdAndUserId(courseId, userId) {
    const rows = await db.load(
      `select score_review.*, score.point as current_point, assignment_category.name as assignment_name, courses.course_name, course_students.student_id
          from score_review
          join score on score_review.score_id = score.id
          join course_students on score.course_student_id = course_students.id
          join assignment_category on assignment_category.id = score.assignment_category_id
          join courses on courses.course_id = assignment_category.course_id
          join coursejoin on coursejoin.course_id = courses.course_id
          join users on users.user_id = coursejoin.user_id
            where users.user_id = '${userId}' and courses.course_id = '${courseId}'
            and (coursejoin.user_role = '${userRoleConstant.HOST}' or coursejoin.user_role='${userRoleConstant.TEACHER}')`
    );

    return rows.length > 0 ? rows : null;
  },
};
