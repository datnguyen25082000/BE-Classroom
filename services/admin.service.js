const userModel = require("../model/user.model");
const courseModel = require("../model/course.model");
const errorMessageConstants = require("../constants/error-message.constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin.model");
const userStatus = require("../constants/user-active-status.constant");

const helper = require("../utils/service-helper");
const success = helper.getSuccessResponse;
const fail = helper.getFailResponse;

module.exports = {
  async authenticate(username, password) {
    const admin = await adminModel.findByUsername(username);

    if (!admin) {
      return fail(errorMessageConstants.USERNAME_NOT_EXIST);
    }

    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (!isCorrectPassword) {
      return fail(errorMessageConstants.INCORRECT_PASSWORD);
    }

    const payload = { username };
    const token = jwt.sign(payload, process.env.JWT_AUTHEN_ADMIN);

    return success({ token });
  },

  async findByUsername(username) {
    const admin = await adminModel.findByUsername(username);
    return admin;
  },

  async getAllAdmin() {
    const admins = await adminModel.all();
    return success(admins);
  },

  async add(username, password, display_name, email) {
    const existAdmin = await adminModel.findByUsername(username);
    if (existAdmin) {
      return fail(errorMessageConstants.USERNAME_ALREADY_EXISTS);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = { username, display_name, email, password: hashPassword };
    const result = await adminModel.add(admin);
    return success({ ...admin, id: result.insertId });
  },

  async getAllUser() {
    const users = await userModel.all();
    return success(users);
  },

  async updateStudentId(user_id, new_student_id) {
    const user = await userModel.findByUserId(user_id);
    if (!user) {
      return fail(errorMessageConstants.USER_ID_NOT_EXIST);
    }

    const existStudentId = await userModel.findByStudentId(new_student_id);
    if (existStudentId) {
      return fail(errorMessageConstants.DUPLICATE_STUDENT_ID);
    }

    user.user_studentid = new_student_id;
    await userModel.patch(user);
    return success(user);
  },

  async lockUser(user_id) {
    const user = await userModel.findByUserId(user_id);
    if (!user) {
      return fail(errorMessageConstants.USER_ID_NOT_EXIST);
    }

    if (user.user_is_active === 2) user.user_is_active = 1;
    else user.user_is_active = userStatus.BLOCKED_BY_ADMIN;
    await userModel.patch(user);
    return success(user);
  },

  async getAllCourses() {
    const courses = await courseModel.all();
    return success(courses);
  },
};
