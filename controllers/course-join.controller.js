const courseJoinService = require("../services/course-join.service");
const MailService = require("../utils/mail");
const jwt = require("jsonwebtoken");
const userRoleConstant = require("../constants/user-role.constant");

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

  async getInvitationCode(req, res, next) {
    const result = await courseJoinService.getInvitationCode(
      req.query.courseId,
      req.user.user_id,
      req.query.role
    );

    if (result.error) {
      res.status(404).json({
        ...defaultRes,
        message: result.error,
      });
    } else {
      res.status(200).json({
        ...defaultRes,
        content: result.code,
      });
    }
  },

  async joinCourseViaInvitationCode(req, res, next) {
    const result = await courseJoinService.joinCourseByInvitationCode(
      req.query.code,
      req.user.user_id
    );

    if (result.error) {
      res.status(404).json({
        ...defaultRes,
        message: result.error,
      });
    } else {
      res.status(200).json({
        ...defaultRes,
        content: result.courseId,
      });
    }
  },

  async inviteViaEmail(req, res, next) {
    const { email, course_id, teacher_invite } = req.body;

    let result = false;

    const role = teacher_invite
      ? userRoleConstant.TEACHER
      : userRoleConstant.STUDENT;
    const invitationCode = await courseJoinService.getInvitationCode(
      course_id,
      req.user.user_id,
      role
    );

    // content of confirm mail
    var content = "";
    content += `
        <div style="padding: 10px">
            <div>
                <h1>NTD MY CLASSROOM</h1>
                <h3>Ch??o m???ng b???n ?????n v???i h??? th???ng l???p h???c myclassroom</h3>
                <p>B???n c?? m???t l???i m???i tham gia l???p h???c ?????n t??? t??i kho???n ${req.user.user_displayname}</p>
                <p>????? tham gia kh??a h???c, vui l??ng truy c???p v??o ???????ng d???n b??n d?????i</p>
                ${process.env.APP_URL}classroom/join/${invitationCode.code}
            </div>
        </div>
    `;

    if (email) {
      result = MailService.SendMail({ email: email, content: content });
    }

    res.json({
      ...defaultRes,
      content: {
        sent: result,
      },
    });
  },

  async leaveCourse(req, res, next) {
    const { user_id } = req.user;
    const { course_id } = req.body;

    await courseJoinService.leaveCourse(user_id, course_id);

    res.json({
      ...defaultRes,
      content: {
        update: true,
      },
    });
  },
};
