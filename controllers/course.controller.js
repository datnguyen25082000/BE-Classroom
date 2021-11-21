const courseService = require("../services/course.service");

const defaultRes = {
  result: 0,
  message: "",
  content: {},
};

module.exports = {
  async getAll(req, res, next) {
    const userId = req.user.user_id;
    const courses = await courseService.getAllCourseByUserId(userId);

    res.json({
      ...defaultRes,
      content: {
        courses,
      },
    });
  },

  async add(req, res, next) {
    const course = await courseService.addCourse(
      req.query.nameclass,
      req.user.user_id
    );
    res.json({
      ...defaultRes,
      content: {
        course,
      },
    });
  },

  async delete(req, res, next) {
    const courseId = req.query.idclass;
    await courseService.deleteCourseById(courseId);
    res.json({ result: {} });
  },

  async get(req, res, next) {
    const { courseId } = req.query;
    const course = await courseService.getCourseById(courseId);
    res.json({
      ...defaultRes,
      content: {
        course,
      },
    });
  },
};
