const db = require("../utils/db");

const TBL_COURSEJOIN = "coursejoin";

// course_id int PK
// user_username varchar(40) PK
// role int
// active int

module.exports = {
  allTeachers(course_id) {
    return db.load(
      `select * from ${TBL_COURSEJOIN} where course_id='${course_id}' and role = 0`
    );
  },

  allStudents(course_id) {
    return db.load(
      `select * from ${TBL_COURSEJOIN} where course_id='${course_id}' and role = 1`
    );
  },

  add(entity) {
    return db.add(entity, TBL_COURSEJOIN);
  },

  del(entity) {
    const condition = { userUsername: entity.userUsername };
    return db.del(condition, TBL_COURSEJOIN);
  },

  async single(username) {
    const rows = await db.load(
      `select * from ${TBL_COURSEJOIN} where user_username = '${username}' `
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { userUsername: entity.userUsername };
    delete entity.username;
    return db.patch(entity, condition, TBL_COURSEJOIN);
  },
};
