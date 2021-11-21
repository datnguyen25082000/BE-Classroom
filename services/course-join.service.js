const courseJoinModel = require("../model/course-join.model");
const courseModel = require("../model/course.model");
const userModel = require("../model/user.model");
const userRoleConstant = require("../constants/user-role.constant");
const errorMessageConstant = require("../constants/error-message.constants");

module.exports = {
  async joinCourse(userId, courseId, userRole = userRoleConstant.STUDENT) {
    const course = await courseModel.single(courseId);
    if (!course) {
      return { error: errorMessageConstant.COURSE_NOT_EXIST };
    }

    const courseJoin = await courseJoinModel.single(userId, courseId);
    console.log("courseJoin: ", courseJoin);
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
    console.log("coursJoins: ", courseJoins);
    let courses = [];
    if (courseJoins) {
      for (const courseJoin of courseJoins) {
        const course = await courseModel.single(courseJoin.course_id);
        courses.push(course);
      }
    }
    console.log("courses: ", courses);

    return courses;
  },

  async getAllMembersOfCourse(courseId) {
    const courseJoins = await courseJoinModel.allByCourse(courseId);
    console.log("courseJoins: ", courseJoins);
    const members = [];
    for (const courseJoin of courseJoins) {
      const user = await userModel.findByUserId(courseJoin.user_id);
      console.log("user: ", user);
      members.push({
        ...user,
        user_role: courseJoin.user_role,
      });
    }
    return members;
  },
};
