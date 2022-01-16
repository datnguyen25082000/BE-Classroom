const db = require("../utils/db");

const TBL_NOTIFICATION = "notification";

module.exports = {
  add(user_id, content) {
    const created_at = new Date();
    const entity = { user_id, content, created_at };
    return db.add(entity, TBL_NOTIFICATION);
  },

  getAllByUserId(userId) {
    return db.load(
      `select * from ${TBL_NOTIFICATION} where user_id = '${userId}' ORDER BY created_at DESC`
    );
  },

  async getById(id) {
    const rows = await db.load(
      `select * from ${TBL_NOTIFICATION} where id = '${id}'`
    );
    return rows.length > 0 ? rows[0] : null;
  },

  markAllAsReadByUserId(userId) {
    return db.load(
      `update ${TBL_NOTIFICATION} set isRead = 1 where user_id = '${userId}'`
    );
  },

  patch(entity) {
    const condition = { id: entity.id };
    return db.patch(entity, condition, TBL_NOTIFICATION);
  },
};
