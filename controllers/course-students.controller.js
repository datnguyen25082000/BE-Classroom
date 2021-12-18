const courseStudentsService = require("../services/course-students.service");

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
