const db = require("../utils/db");

const TBL_NOTIFICATION = "notification";

module.exports = {
  add(user_id, content) {
    const created_at = new Date();
    const entity = { user_id, content, created_at };
    return db.add(entity, TBL_NOTIFICATION);
  },
};
