const courseStudentsService = require("../services/course-students.service");
const processResult = require("../utils/api-helper").processResult

module.exports = {
  async getAllByCourse(req, res, next) {
    const result = await courseStudentsService.getAllByCourse(
      req.query.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },

  async addManyByCourse(req, res, next) {
    const result = await courseStudentsService.addManyByCourse(
      req.body.students,
      req.body.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },
};