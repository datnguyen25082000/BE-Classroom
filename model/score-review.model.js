const db = require("../utils/db");

const TBL_SCORE_REVIEW = "score_review";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE_REVIEW);
  },

  async getByScoreId(score_id) {
    const results = await db.load(
      `select * from ${TBL_SCORE_REVIEW} where score_id = '${score_id}'`
    );

    return results.length ? results[0] : null;
  },

  async getById(id) {
    const results = await db.load(
      `select * from ${TBL_SCORE_REVIEW} where id = '${id}'`
    );

    return results.length ? results[0] : null;
  },

  async getByStudentId(studentId) {
    const results = await db.load(`select score_review.*
            from score_review 
            join score on score.id = score_review.score_id
            join course_students on score.course_student_id = course_students.id
            join users on users.user_studentid = course_students.student_id
            where users.user_studentid = ${studentId}`);
    return results;
  },

  async getByStudentIdAndAssignment(studentId, assignment_category_id) {
    const results = await db.load(`select score_review.*
            from score_review 
            join score on score.id = score_review.score_id
            join course_students on score.course_student_id = course_students.id
            join users on users.user_studentid = course_students.student_id
            join assignment_category on score.assignment_category_id = assignment_category.id
            where users.user_studentid = ${studentId}
            and assignment_category_id = '${assignment_category_id}'`);
    return results.length > 0 ? results[0] : null;
  },

  patch(entity) {
    const condition = { id: entity.id };
    return db.patch(entity, condition, TBL_SCORE_REVIEW);
  },
};
