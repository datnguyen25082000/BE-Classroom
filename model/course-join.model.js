const db = require("../utils/db");

const TBL_COURSE_JOIN = "coursejoin";

module.exports = {
  allByUser(userId) {
    return db.load(
      `select * from ${TBL_COURSE_JOIN} where user_id = ${userId}`
    );
  },

  allByCourse(courseId) {
    return db.load(
      `select * from ${TBL_COURSE_JOIN} where course_id = ${courseId}`
    );
  },

  async single(userId, courseId) {
    const rows = await db.load(
      `select * from ${TBL_COURSE_JOIN} where course_id = ${courseId} and user_id = ${userId}`
    );

    return rows.length ? rows[0] : null;
  },

  add(entity) {
    return db.add(entity, TBL_COURSE_JOIN);
  },

  del(entity) {
    const condition = { course_id: entity.course_id, user_id: entity.user_id };
    // return db.del(condition, TBL_COURSE_JOIN);
    return db.load(
      `delete from ${TBL_COURSE_JOIN} where course_id=${condition.course_id} and user_id=${condition.user_id}`
    );
  },

  delByCourseId(entity) {
    const condition = { course_id: entity.course_id };
    return db.del(condition, TBL_COURSE_JOIN);
  },

  patch(entity) {
    const condition = { course_id: entity.course_id, user_id: entity.user_id };
    return db.patch(entity, condition, TBL_COURSE_JOIN);
  },
};
