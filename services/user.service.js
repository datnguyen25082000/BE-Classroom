const userModel = require("../model/user.model");
const errorMessageConstants = require("../constants/error-message.constants");
const bcrypt = require("bcrypt");

module.exports = {
  async authenticateUser(username, password) {
    const user = userModel.single(username);

    if (!username) {
      return {
        success: false,
        data: errorMessageConstants.USERNAME_NOT_EXIST,
      };
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
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

  async registerUser(username, password, displayName) {
    const user = await userModel.single(username);

    if (user) {
      return {
        success: false,
        data: errorMessageConstants.USERNAME_ALREADY_EXISTS,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    userModel.add({
      user_username: username,
      user_password: hashPassword,
      user_displayname: displayName,
    });

    return { success: true };
  },
};
