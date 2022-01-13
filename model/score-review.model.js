const db = require("../utils/db");

const TBL_SCORE_REVIEW = "score_review";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE_REVIEW);
  },

  async getByScoreId(score_id) {
    const results = await db.load(
      `select * from ${TBL_SCORE_REVIEW} where score_id = '${score_id}'`
    );

    return results.length ? results[0] : null;
  },
};
