const db = require("../utils/db");

const TBL_COURSES = "courses";

module.exports = {
  all(userId) {
    return db.load(
      `select * from ${TBL_COURSES} where course_hostid = '${userId}' ORDER BY course_createdate DESC`
    );
  },

  all() {
    return db.load(`select * from ${TBL_COURSES} order by course_createdate`);
  },

  add(entity) {
    return db.add(entity, TBL_COURSES);
  },

  del(entity) {
    const condition = { course_id: entity.course_id };
    return db.del(condition, TBL_COURSES);
  },

  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_COURSES} where course_id = '${id}' `
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { course_id: entity.course_id };
    delete entity.course_id;
    return db.patch(entity, condition, TBL_COURSES);
  },
};
