const courseModel = require("../model/course.model");
const errorMessageConstant = require("../constants/error-message.constants");
const assignmentCategoryModel = require("../model/assignment-category.model");
const errorMessageConstants = require("../constants/error-message.constants");
const courseJoinModel = require("../model/course-join.model");
const userRoleConstant = require("../constants/user-role.constant");

module.exports = {
  async add(name, point, course_id, current_user_id) {
    const isNameExist = await isAssignmentCategoryNameExist(name, course_id);
    if (isNameExist) {
      return {
        error: errorMessageConstant.ASSIGNMENT_CATEGORY_NAME_ALREADY_EXIST,
      };
    }

    const course = await courseModel.single(course_id);
    if (!course) {
      return {
        error: errorMessageConstant.COURSE_NOT_EXIST,
      };
    }

    const havePermission = await isUserHavePermission(
      current_user_id,
      course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstant.NOT_HAVE_PERMISSION,
      };
    }

    const currentFinalPosition =
      await assignmentCategoryModel.currentFinalPositionOfCourse(course_id);

    assignmentCategoryModel.add(
      name,
      point,
      course_id,
      currentFinalPosition + 1
    );

    return { error: null };
  },

  async update(assignmentCategoryId, newName, newPoint, current_user_id) {
    let assignmentCategory = await assignmentCategoryModel.single(
      assignmentCategoryId
    );
    if (!assignmentCategory) {
      return { error: errorMessageConstant.ASSIGNMENT_CATEGORY_NOT_EXIST };
    }


    const havePermission = await isUserHavePermission(
      current_user_id,
      assignmentCategory.course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstant.NOT_HAVE_PERMISSION,
      };
    }

    const isNameUpdated = assignmentCategory.name !== newName;
    if (isNameUpdated) {
      const isNewNameAlreadyExist = await isAssignmentCategoryNameExist(
        newName,
        assignmentCategory.course_id
      );
      if (isNewNameAlreadyExist) {
        return {
          error: errorMessageConstant.ASSIGNMENT_CATEGORY_NAME_ALREADY_EXIST,
        };
      }
    }

    assignmentCategory.name = newName;
    assignmentCategory.point = newPoint;

    assignmentCategoryModel.patch(assignmentCategory);

    return { error: null };
  },

  async delete(assignmentCategoryId, current_user_id) {
    const assignmentCategory = await assignmentCategoryModel.single(
      assignmentCategoryId
    );

    if (!assignmentCategory) {
      return { error: errorMessageConstants.ASSIGNMENT_CATEGORY_NOT_EXIST };
    }

    const havePermission = await isUserHavePermission(
      current_user_id,
      assignmentCategory.course_id
    );
    if (!havePermission) {
      return {
        error: errorMessageConstant.NOT_HAVE_PERMISSION,
      };
    }

    assignmentCategoryModel.del(assignmentCategory);
    return { error: null };
  },

  async updatePosition(assignmentCategories, current_user_id) {
    const currentAssignmentCategories = [];
    for (const category of assignmentCategories) {
      const currentCategory = await assignmentCategoryModel.single(category.id);
      if (!currentCategory) {
        return { error: errorMessageConstants.ASSIGNMENT_CATEGORY_NOT_EXIST };
      }

      const havePermission = await isUserHavePermission(
        current_user_id,
        currentCategory.course_id
      );
      if (!havePermission) {
        return {
          error: errorMessageConstant.NOT_HAVE_PERMISSION,
        };
      }

      currentCategory.position = category.position;
      currentAssignmentCategories.push(currentCategory);
    }

    assignmentCategoryModel.patchMany(currentAssignmentCategories);
    return { error: null };
  },
};

const isAssignmentCategoryNameExist = async (name, courseId) => {
  const assignmentCategory = await assignmentCategoryModel.singleByName(name, courseId);
  const isExist = assignmentCategory !== null;
  return isExist;
};

const isUserHavePermission = async (userId, courseId) => {
  const courseJoin = await courseJoinModel.single(userId, courseId);

  if (courseJoin && isTeacherOrHost(courseJoin.user_role)) {
    return true
  }
  return false;
};

const isTeacherOrHost = (userRole) => {
  return (
    userRole === userRoleConstant.TEACHER || userRole === userRoleConstant.HOST
  );
};
