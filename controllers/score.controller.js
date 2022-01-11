const scoreService = require("../services/score.service");
const processResult = require("../utils/api-helper").processResult

module.exports = {
  async addManyByAssignmentCategory(req, res, next) {
    const result = await scoreService.addManyByAssignmentCategory(
      req.body.scores,
      req.body.assignment_category_id,
      req.user.user_id
    );

    processResult(result, res);
  },

  async getAllByCourse(req, res, next) {
    const result = await scoreService.getAllByCourse(
      req.query.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },

  async getAllByCourseAndCurrentUser(req, res, next) {
    const result = await scoreService.getAllByCourseAndStudentId(
      req.query.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },
};
