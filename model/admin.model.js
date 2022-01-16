const db = require("../utils/db");

const TBL_ADMIN = "admin";

module.exports = {
  add(username, password) {
    const entity = { username, password };
    return db.add(entity, TBL_ADMIN);
  },

  async findByUsername(username) {
    const rows = await db.load(
      `select * from ${TBL_ADMIN} where username = '${username}'`
    );

    return rows.length ? rows[0] : null;
  },
};
