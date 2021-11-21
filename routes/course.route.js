var express = require("express");
var router = express.Router();
const CourseModel = require("../model/course.model");
const CourseJoinModel = require("../model/coursejoin.model");

const MailService = require("../utils/mail");
const jwt = require("jsonwebtoken");

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

router.post("/InviteViaEmail", async function (req, res, next) {
  const { email, course_id, teacher_invite } = req.body;
  let result = false;

  const token = jwt.sign(
    {
      email: email,
      course_id: course_id,
      teacher_invite: teacher_invite,
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: "1d",
    }
  );

  // content of confirm mail
  var content = "";
  content += `
        <div style="padding: 10px">
            <div>
                <h1>NTD MY CLASSROOM</h1>
                <h3>Chào mừng bạn đến với hệ thống lớp học myclassroom</h3>
                <p>Bạn có một lời mời tham gia lớp học đến từ tài khoản dat@gmail.com</p>
                <button>
                  <a href='http://localhost:5000/api/auth/AcceptInvite?token=${token}'>Đồng ý tham gia</a>
                </button>
            </div>
        </div>
    `;

  if (email) {
    const newData = {
      course_id: course_id,
      role: teacher_invite ? 1 : 0,
      active: 0,
      user_username: email,
    };

    CourseJoinModel.add(newData);

    result = MailService.SendMail({ email: email, content: content });
  }

  res.json({
    ...defaultRes,
    content: {
      sent: result,
    },
  });
});

module.exports = router;
