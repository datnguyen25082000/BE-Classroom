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

  async single(username, userType = null) {
    let rows;
    if (userType === null) {
      rows = await db.load(
        `select * from ${TBL_USERS} where user_username = '${username}' `
      );
    }
    else {
      rows = await db.load(
        `select * from ${TBL_USERS} where user_username = '${username}' and user_type = ${userType}`
      )
    }

    if (rows.length === 0) return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { userId: entity.userId };
    delete entity.id;
    return db.patch(entity, condition, TBL_USERS);
  },
};
