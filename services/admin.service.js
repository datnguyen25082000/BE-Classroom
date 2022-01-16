const userModel = require("../model/user.model");
const errorMessageConstants = require("../constants/error-message.constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin.model");

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
};
