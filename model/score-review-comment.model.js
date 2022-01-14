const db = require("../utils/db");

const TBL_SCORE_REVIEW_COMMENT = "score_review_comment";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE_REVIEW_COMMENT);
  },

  async getByScoreReviewId(score_review_id) {
    const results = await db.load(
      `select * from ${TBL_SCORE_REVIEW_COMMENT} where score_review_id = '${score_review_id}'`
    );

    return results.length ? results : null;
  },
};
