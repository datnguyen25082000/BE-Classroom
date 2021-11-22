const courseService = require("../services/course.service");
const userService = require("../services/user.service");
const courseJoinService = require("../services/course-join.service");

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
      req.user.user_id,
      req.query?.codeclass
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
    const { user_id } = req.user;
    const course = await courseService.getCourseById(courseId);

    if (course && course.course_hostid === user_id) {
      await courseJoinService.deleteCourseById(courseId);
      await courseService.deleteCourseById(courseId);
    }

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

  async updateInfo(req, res, next) {
    const data = ({
      course_name,
      course_des,
      course_topic,
      course_code,
      course_id,
    } = req.body);
    const { user_username } = req.user;

    const course = await courseService.getCourseById(course_id);
    const user = await userService.findUserByUsername2(user_username);

    if (course && user && course_name) {
      if (course.course_hostid === user.user_id) {
        await courseService.updateInfo(data);

        res.json({
          ...defaultRes,
          content: {
            update: true,
          },
        });
      }
    }

    res.json({
      ...defaultRes,
      content: {
        update: false,
      },
    });
  },
};
