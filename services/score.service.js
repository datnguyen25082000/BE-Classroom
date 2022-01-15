const errorMessageConstants = require("../constants/error-message.constants");
const courseJoinModel = require("../model/course-join.model");
const userRoleConstant = require("../constants/user-role.constant");
const courseStudentsModel = require("../model/course-students.model");
const assignmentCategoryModel = require("../model/assignment-category.model");
const scoreModel = require("../model/score.model");
const courseModel = require("../model/course.model");
const userModel = require("../model/user.model");

module.exports = {
  async addManyByAssignmentCategory(
    scores,
    assignment_category_id,
    current_user_id
  ) {
    const assignmentCategory = await assignmentCategoryModel.single(
      assignment_category_id
    );
    if (!assignmentCategory) {
      return {
        error: errorMessageConstants.ASSIGNMENT_CATEGORY_NOT_EXIST,
      };
    }

    const course_id = assignmentCategory.course_id;

    const havePermission = await isUserHavePermissionToEdit(
      current_user_id,
      course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstants.NOT_HAVE_PERMISSION,
      };
    }

    for (const score of scores) {
      const sameIdStudents = scores.filter(
        (x) => x.student_id === score.student_id
      );
      if (sameIdStudents.length > 1) {
        return {
          error: errorMessageConstants.DUPLICATE_STUDENT_ID,
        };
      }
    }

    await scoreModel.deleteAllByAssignmentCategory(assignment_category_id);

    const savedScores = [];
    for (const score of scores) {
      const course_student = await courseStudentsModel.getByStudentIdAndCourse(
        score.student_id,
        course_id
      );

      if (!course_student) {
        return {
          error: errorMessageConstants.STUDENT_ID_NOT_EXIST,
        };
      }
      const entity = {
        assignment_category_id,
        point: score.point,
        course_student_id: course_student.id,
      };
      const result = await scoreModel.add(entity);
      savedScores.push({ ...entity, id: result.insertId });
    }

    return {
      data: savedScores,
    };
  },

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
    if (!courseStudents) {
      return {
        error: null,
        data: null,
      };
    }

    const scores = [];
    for (const courseStudent of courseStudents) {
      const scoresOfStudent = await scoreModel.getAllByCourseStudent(
        courseStudent.id
      );
      scores.push({ ...courseStudent, scoresOfStudent });
    }

    return {
      data: scores,
    };
  },

  async getAllByCourseAndStudentId(course_id, current_user_id) {
    const user = await userModel.findByUserId(current_user_id);
    if (!user.user_studentid) {
      return {
        error: null,
      };
    }

    const student = await courseStudentsModel.getByStudentIdAndCourse(
      user.user_studentid,
      course_id
    );
    if (!student) {
      return {
        error: null,
      };
    }

    const assignmentCategories = (
      await assignmentCategoryModel.allByCourse(course_id)
    ).filter((x) => x.isFinalized);

    const scores = [];
    for (const assignmentCategory of assignmentCategories) {
      const score = await scoreModel.getByStudentAndAssignmentCategory(
        student.id,
        assignmentCategory.id
      );

      if (score && score.length) scores.push(score[0]);
    }

    return {
      data: {
        score: scores,
        student: student,
      },
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
