const courseJoinModel = require("../model/course-join.model");
const courseModel = require("../model/course.model");
const userModel = require("../model/user.model");
const userRoleConstant = require("../constants/user-role.constant");
const errorMessageConstant = require("../constants/error-message.constants");
const jwt = require("jsonwebtoken");

module.exports = {
  async joinCourse(userId, courseId, userRole = userRoleConstant.STUDENT) {
    const course = await courseModel.single(courseId);
    if (!course) {
      return { error: errorMessageConstant.COURSE_NOT_EXIST };
    }

    const courseJoin = await courseJoinModel.single(userId, courseId);
    if (courseJoin) {
      return { error: errorMessageConstant.ALREADY_JOINED_COURSE };
    }

    await courseJoinModel.add({
      course_id: courseId,
      user_id: userId,
      user_role: userRole,
    });

    return { error: null };
  },

  async leaveCourse(userId, courseId) {
    const courseJoin = await courseJoinModel.single(userId, courseId);
    if (!courseJoin) {
      return { error: errorMessageConstant.ALREADY_LEAVED_COURSE };
    }

    await courseJoinModel.del({
      course_id: courseId,
      user_id: userId,
    });
    return { error: null };
  },

  async getAllCoursesOfUser(userId) {
    const courseJoins = await courseJoinModel.allByUser(userId);
    let courses = [];
    if (courseJoins) {
      for (const courseJoin of courseJoins) {
        const course = await courseModel.single(courseJoin.course_id);
        courses.push(course);
      }
    }

    return courses;
  },

  async getAllMembersOfCourse(courseId) {
    const courseJoins = await courseJoinModel.allByCourse(courseId);
    const members = [];
    for (const courseJoin of courseJoins) {
      const user = await userModel.findByUserId(courseJoin.user_id);
      members.push({
        ...user,
        user_role: courseJoin.user_role,
      });
    }
    return members;
  },

  async getInvitationCode(courseId, currentUserId, role) {
    const courseJoin = await courseJoinModel.single(currentUserId, courseId);

    if (!havePermissionToGetInvitationCode(courseJoin)) {
      return {
        error: errorMessageConstant.NOT_HAVE_PERMISSION,
      };
    }

    const payload = {
      courseId,
      role,
    };

    const code = jwt.sign(payload, process.env.JWT_INVITATION_CODE);

    return { code };
  },

  async joinCourseByInvitationCode(code, userId) {
    const { courseId, role } = jwt.verify(
      code,
      process.env.JWT_INVITATION_CODE
    );

    const course = await courseModel.single(courseId);

    if (!course) {
      return { error: errorMessageConstant.COURSE_NOT_EXIST };
    }

    await courseJoinModel.add({
      course_id: courseId,
      user_id: userId,
      user_role: role,
    });

    return { courseId };
  },
};

const havePermissionToGetInvitationCode = (courseJoin) => {
  return (
    courseJoin &&
    (courseJoin.user_role === userRoleConstant.TEACHER ||
      courseJoin.user_role === userRoleConstant.HOST)
  );
};
