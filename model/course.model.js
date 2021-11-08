const db = require("../utils/db");

const TBL_COURSES = "courses";

// COURSE_ID varchar(30) PK
// COURSE_NAME varchar(40)
// COURSE_HOSTID varchar(30)
// COURSE_CREATEDATE date
// COURSE_THUMBNAIL varchar(100)
// COURSE_TOPIC varchar(20)

module.exports = {
  all(username) {
    return db.load(
      `select * from ${TBL_COURSES} where course_hostid = '${username}' ORDER BY course_createdate DESC`
    );
  },

  add(entity) {
    return db.add(entity, TBL_COURSES);
  },

  del(entity) {
    const condition = { idclass: entity.idclass };
    return db.del(condition, TBL_COURSES);
  },

  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_COURSES} where userUsername = '${id}' `
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { userUsername: entity.userUsername };
    delete entity.username;
    return db.patch(entity, condition, TBL_COURSES);
  },
};
