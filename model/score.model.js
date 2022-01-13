const db = require("../utils/db");

const TBL_SCORE = "score";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE);
  },

  deleteAllByAssignmentCategory(assignmentCategoryId) {
    return db.load(
      `delete from ${TBL_SCORE} where assignment_category_id = ${assignmentCategoryId}`
    );
  },

  async getAllByCourseStudent(courseStudentId) {
    const results = await db.load(
      `select * from ${TBL_SCORE} where course_student_id = ${courseStudentId}`
    );

    return results.length ? results : null;
  },

  async getByStudentAndAssignmentCategory(
    courseStudentId,
    assignmentCategoryId
  ) {
    const results = await db.load(
      `select * from ${TBL_SCORE} where course_student_id = '${courseStudentId}' and assignment_category_id = ${assignmentCategoryId}`
    );

    return results.length ? results : null;
  },

  async getById(id) {
    const results = await db.load(
      `select * from ${TBL_SCORE} where id = '${id}'`
    );

    return results.length ? results[0] : null;
  },
};
