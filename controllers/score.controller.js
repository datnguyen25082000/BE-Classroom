const scoreService = require("../services/score.service");
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
};

const processResult = (result, res) => {
  const defaultRes = {
    result: 0,
    message: "",
    content: {},
  };
  if (result.error) {
    res.status(404).json({
      ...defaultRes,
      message: result.error,
    });
  } else if (result.data) {
    res.status(200).json({ ...defaultRes, content: result.data });
  } else {
    res.status(200).json(defaultRes);
  }
};
