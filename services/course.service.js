const courseModel = require("../model/course.model");
const courseJoinModel = require("../model/course-join.model");
const userRoleConstant = require("../constants/user-role.constant");

module.exports = {
  async getAllCourseByUserId(userId) {
    return await courseModel.all(userId);
  },

  async addCourse(name, hostId, topic = null, thumbnail = null) {
    const course = {
      course_name: name,
      course_hostid: hostId,
      course_topic: topic,
      course_createdate: new Date(),
      course_thumbnail:
        thumbnail ||
        "https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg",
    };
    const result = await courseModel.add(course);
    course.course_id = result.insertId;

    await courseJoinModel.add({
      course_id: course.course_id,
      user_id: hostId,
      user_role: userRoleConstant.HOST,
    });
    return course;
  },

  async deleteCourseById(id) {
    await courseModel.del({ course_id: id });
  },

  async getCourseById(id) {
    return await courseModel.single(id);
  },
};
