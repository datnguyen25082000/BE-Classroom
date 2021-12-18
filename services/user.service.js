const userModel = require("../model/user.model");
const errorMessageConstants = require("../constants/error-message.constants");
const bcrypt = require("bcrypt");
const userTypeConstant = require("../constants/user-type.constant");

module.exports = {
  async authenticateUser(
    username,
    password,
    userType = userTypeConstant.NORMAL_USER
  ) {
    const user = await userModel.findByUsername(username, userType);

    if (!user) {
      return {
        success: false,
        data: errorMessageConstants.USERNAME_NOT_EXIST,
      };
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.user_password
    );
    if (isCorrectPassword) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        data: errorMessageConstants.INCORRECT_PASSWORD,
      };
    }
  },

  async registerUser(
    username,
    password,
    displayName,
    userType = userTypeConstant.NORMAL_USER
  ) {
    const user = await userModel.findByUsername(username, userType);

    if (user) {
      return {
        success: false,
        data: errorMessageConstants.USERNAME_ALREADY_EXISTS,
      };
    }

    if (userType === userTypeConstant.NORMAL_USER) {
      const hashPassword = await bcrypt.hash(password, 10);
      userModel.add({
        user_username: username,
        user_password: hashPassword,
        user_displayname: displayName,
        user_type: userType,
      });
    } else {
      userModel.add({
        user_username: username,
        user_displayname: displayName,
        user_type: userType,
      });
    }

    return { success: true };
  },

  async findUserByUsername(username, userType = userTypeConstant.NORMAL_USER) {
    const user = await userModel.findByUsername(username, userType);

    return user;
  },

  async findUserByUsername2(username) {
    const user = await userModel.findByUsername(username);

    return user;
  },

  async updateInfo(username, entity) {
    const user = await userModel.findByUsername(username);

    if (user) {
      await userModel.patch({ ...entity, user_username: username });
      return true;
    }

    return false;
  },

  async findUserByStudentId(studentId) {
    const user = await userModel.findByStudentId(studentId)

    return user
  }
};
