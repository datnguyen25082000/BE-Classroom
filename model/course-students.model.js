const db = require("../utils/db");

const TBL_COURSE_STUDENTS = "course_students";

module.exports = {
  add(student_id, full_name, course_id) {
    const entity = {
      student_id,
      full_name,
      course_id,
    };
    return db.add(entity, TBL_COURSE_STUDENTS);
  },

  deleteAllByCourse(courseId) {
    return db.load(
      `delete from ${TBL_COURSE_STUDENTS} where course_id = ${courseId}`
    );
  },

  async getAllByCourse(courseId) {
    const results = await db.load(
      `select * from ${TBL_COURSE_STUDENTS} where course_id = ${courseId}`
    );

    return results.length ? results : null;
  },
};
