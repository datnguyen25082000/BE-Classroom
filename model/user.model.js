const db = require("../utils/db");
const userTypeConstant = require("../constants/user-type.constant");

const TBL_USERS = "users";

module.exports = {
  all() {
    return db.load(`select * from ${TBL_USERS}`);
  },

  add(entity) {
    return db.add(entity, TBL_USERS);
  },

  del(entity) {
    const condition = { userId: entity.userId };
    return db.del(condition, TBL_USERS);
  },

  async findByUsername(username, userType = null) {
    let rows;
    if (userType === null) {
      rows = await db.load(
        `select * from ${TBL_USERS} where user_username = '${username}' `
      );
    } else {
      rows = await db.load(
        `select * from ${TBL_USERS} where user_username = '${username}' and user_type = ${userType}`
      );
    }

    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByEmail(email) {
    const rows = await db.load(
        `select * from ${TBL_USERS} where user_email = '${email}' `
      );

    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByUserId(userId) {
    let rows;

    rows = await db.load(
      `select * from ${TBL_USERS} where user_id = '${userId}' `
    );

    if (rows.length === 0) return null;

    return rows[0];
  },

  async findByStudentId(studentId) {
    const rows = await db.load(
      `select * from ${TBL_USERS} where user_studentid = '${studentId}' `
    );

    if (rows.length === 0) return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { user_username: entity.user_username };
    delete entity.user_username;
    return db.patch(entity, condition, TBL_USERS);
  },
};
