const db = require("../utils/db");

const TBL_SCORE_REVIEW_COMMENT = "score_review_comment";

module.exports = {
  add(entity) {
    return db.add(entity, TBL_SCORE_REVIEW_COMMENT);
  },

  async getByScoreReviewId(score_review_id) {
    const results = await db.load(
      `select ${TBL_SCORE_REVIEW_COMMENT}.*, users.user_displayname as displayName
         from ${TBL_SCORE_REVIEW_COMMENT} 
          join users on users.user_id = ${TBL_SCORE_REVIEW_COMMENT}.created_by
          where score_review_id = '${score_review_id}'`
    );

    return results.length ? results : null;
  },
};
