var express = require("express");
var router = express.Router();
const CourseModel = require("../model/course.model");

const defaultRes = {
  result: 0,
  message: "",
  content: {},
};

/* GET home page. */
router.get("/GetAllCourse", async function (req, res, next) {
  const { username } = req.user;
  const listCourses = await CourseModel.all(username);

  res.json({
    ...defaultRes,
    content: {
      courses: listCourses,
    },
  });
});

router.post("/AddCourse", async function (req, res, next) {
  const query = req.query;
  const { username } = req.user;

  const newClass = {
    course_name: query.nameclass,
    course_thumbnail:
      "https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg",
    course_hostid: username,
    course_createdate: new Date(),
  };

  const newData = await CourseModel.add(newClass);
  res.json({
    ...defaultRes,
    content: {
      course: { ...newClass, course_id: newData.insertId },
    },
  });
});

router.post("/DeleteCourse", async function (req, res, next) {
  const query = req.query;

  await CourseModel.del({ idclass: query.idclass });
  res.json({ result: {} });
});

router.get("/GetOneCourse", async function (req, res, next) {
  const { courseId } = req.query;

  const course = await CourseModel.single(courseId);
  res.json({
    ...defaultRes,
    content: {
      course,
    },
  });
});

module.exports = router;
