const courseModel = require("../model/course.model");
const errorMessageConstants = require("../constants/error-message.constants");
const courseJoinModel = require("../model/course-join.model");
const userRoleConstant = require("../constants/user-role.constant");
const courseStudentsModel = require("../model/course-students.model");
const scoreModel = require("../model/score.model");
const assignmentCategoryModel = require("../model/assignment-category.model");

module.exports = {
  async getAllByCourse(course_id, current_user_id) {
    const course = await courseModel.single(course_id);
    if (!course) {
      return {
        error: errorMessageConstants.COURSE_NOT_EXIST,
      };
    }

    const havePermission = await isUserHavePermissionToEdit(
      current_user_id,
      course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstants.NOT_HAVE_PERMISSION,
      };
    }

    const courseStudents = await courseStudentsModel.getAllByCourse(course_id);
    return {
      error: null,
      data: courseStudents,
    };
  },

  async addManyByCourse(students, course_id, current_user_id) {
    const course = await courseModel.single(course_id);
    if (!course) {
      return {
        error: errorMessageConstants.COURSE_NOT_EXIST,
      };
    }

    const havePermission = await isUserHavePermissionToEdit(
      current_user_id,
      course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstants.NOT_HAVE_PERMISSION,
      };
    }

    for (const student of students) {
      const sameIdStudents = students.filter(
        (x) => x.student_id === student.student_id
      );
      if (sameIdStudents.length > 1) {
        return {
          error: errorMessageConstants.DUPLICATE_STUDENT_ID,
        };
      }

      const existStudent = await courseStudentsModel.getByStudentIdAndCourse(
        student.student_id,
        course_id
      );

      if (existStudent) {
        students = students.filter((x) => x !== student.student_id);
      }
    }

    for (const student of students) {
      await courseStudentsModel.add(
        student.student_id,
        student.full_name,
        course_id
      );
    }

    const courseStudents = await courseStudentsModel.getAllByCourse(course_id);

    return {
      error: null,
      data: courseStudents,
    };
  },
};

const isUserHavePermissionToEdit = async (userId, courseId) => {
  const courseJoin = await courseJoinModel.single(userId, courseId);

  if (courseJoin && isTeacherOrHost(courseJoin.user_role)) {
    return true;
  }
  return false;
};

const isTeacherOrHost = (userRole) => {
  return (
    userRole === userRoleConstant.TEACHER || userRole === userRoleConstant.HOST
  );
};
