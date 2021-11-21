const courseJoinService = require("../services/course-join.service");

const defaultRes = {
  result: 0,
  message: "",
  content: {},
};

module.exports = {
  async getAllMembersOfCourse(req, res, next) {
    const members = await courseJoinService.getAllMembersOfCourse(
      req.query.courseId
    );

    res.json(members);
  },

  async getAllCourses(req, res, next) {
    const courses = await courseJoinService.getAllCoursesOfUser(
      req.user.user_id
    );

    res.json({
      ...defaultRes,
      content: {
        courses,
      },
    });
  },

  async joinCourse(req, res, next) {
    const result = await courseJoinService.joinCourse(
      req.user.user_id,
      req.query.courseId
    );

    if (result.error) {
      res.status(404).json({
        ...defaultRes,
        message: result.error,
      });
    } else {
      res.status(200).json(defaultRes);
    }
  },
};
