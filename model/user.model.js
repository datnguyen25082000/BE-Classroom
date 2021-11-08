const db = require('../utils/db');

const TBL_USERS = 'users';

// USER_USERNAME varchar(30) PK 
// USER_DISPLAYNAME varchar(40) 
// USER_PASSWORD varchar(100) 
// USER_EMAIL varchar(35) 
// USER_AVATAR varchar(100) 
// USER_PHONE varchar(12)

module.exports = {
  all() {
    return db.load(`select * from ${TBL_USERS}`);
  },

  add(entity) {
    return db.add(entity, TBL_USERS)
  },

  del(entity) {
    const condition = { userUsername: entity.userUsername };
    return db.del(condition, TBL_USERS);
  },

  async single(username) {
    const rows = await db.load(`select * from ${TBL_USERS} where user_username = '${username}' `);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  patch(entity) {
    const condition = { userUsername: entity.userUsername };
    delete entity.username;
    return db.patch(entity, condition, TBL_USERS);
  }
};
