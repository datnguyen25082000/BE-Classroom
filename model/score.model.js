const db = require("../utils/db");

const TBL_SCORE = "score";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE);
  },

  deleteAllByAssignmentCategory(assignmentCategoryId) {
    return db.load(
      `delete from ${TBL_SCORE} where assignment_category_id = ${assignmentCategoryId}`
    );
  },
};
