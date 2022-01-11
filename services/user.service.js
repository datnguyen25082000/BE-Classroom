const userModel = require("../model/user.model");
const errorMessageConstants = require("../constants/error-message.constants");
const bcrypt = require("bcrypt");
const userTypeConstant = require("../constants/user-type.constant");
const mailService = require("../utils/mail");
const jwt = require("jsonwebtoken");
const userActiveStatusConstant = require("../constants/user-active-status.constant");

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
    if (!isCorrectPassword) {
      return {
        success: false,
        data: errorMessageConstants.INCORRECT_PASSWORD,
      };
    }

    if (
      (user.user_is_active = userActiveStatusConstant.NOT_ACTIVATED_BY_USER)
    ) {
      return {
        success: false,
        data: errorMessageConstants.ACCOUNT_IS_NOT_ACTIVATED_BY_USER,
      };
    }

    switch (user.user_is_active) {
      case userActiveStatusConstant.NOT_ACTIVATED_BY_USER:
        return {
          success: false,
          data: errorMessageConstants.ACCOUNT_IS_NOT_ACTIVATED_BY_USER,
        };
      case userActiveStatusConstant.BLOCKED_BY_ADMIN:
        return {
          success: false,
          data: errorMessageConstants.ACCOUNT_IS_BLOCKED_BY_ADMIN,
        };
      default:
        return {
          success: true,
        };
    }
  },

  async registerUser(
    username,
    password,
    displayName,
    email,
    userType = userTypeConstant.NORMAL_USER
  ) {
    let user = await userModel.findByUsername(username, userType);

    if (user) {
      return {
        success: false,
        data: errorMessageConstants.USERNAME_ALREADY_EXISTS,
      };
    }

    user = await userModel.findByEmail(email);
    if (user) {
      return {
        success: false,
        data: errorMessageConstants.EMAIL_ALREADY_EXISTS,
      };
    }

    if (userType === userTypeConstant.NORMAL_USER) {
      const hashPassword = await bcrypt.hash(password, 10);
      userModel.add({
        user_username: username,
        user_password: hashPassword,
        user_displayname: displayName,
        user_email: email,
        user_type: userType,
      });
    } else {
      userModel.add({
        user_username: username,
        user_displayname: displayName,
        user_type: userType,
        user_is_active: userActiveStatusConstant.ACTIVE,
      });
    }

    if (userType === userTypeConstant.NORMAL_USER) {
      const code = jwt.sign(
        {
          email,
        },
        process.env.JWT_ACCOUNT_ACTIVATION
      );
      const content = `
        <div style="padding: 10px">
            <div>
                <h1>NTD MY CLASSROOM</h1>
                <h3>Chào mừng bạn đến với hệ thống lớp học myclassroom</h3>
                <p>Bạn đã đăng kí tài khoản thành công.</p>
                <p>Để kích hoạt tài khoản, vui lòng truy cập vào đường dẫn bên dưới</p>
                ${process.env.APP_URL}account/${code}
            </div>
        </div>
      `;
      mailService.SendMail({
        email,
        content,
      });
    }

    return { success: true };
  },

  async activateUser(code) {
    const { email } = jwt.verify(code, process.env.JWT_ACCOUNT_ACTIVATION);
    const user = await userModel.findByEmail(email);

    if (!user) {
      return {
        success: false,
        data: errorMessageConstants.USER_WITH_THIS_EMAIL_NOT_EXISTS,
      };
    }

    if (user.user_is_active === userActiveStatusConstant.ACTIVE) {
      return {
        success: false,
        data: errorMessageConstants.USER_ALREADY_ACTIVATED,
      };
    }

    await userModel.patch(user);

    return {
      success: true,
      data: user,
    };
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
    const user = await userModel.findByStudentId(studentId);

    return user;
  },

  async forgotPassword(email) {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return {
        success: false,
        data: errorMessageConstants.USER_WITH_THIS_EMAIL_NOT_EXISTS,
      };
    }

    const code = jwt.sign(
      {
        email,
      },
      process.env.JWT_FORGOT_PASSWORD
    );
    const content = `
        <div style="padding: 10px">
            <div>
                <h1>NTD MY CLASSROOM</h1>
                <h3>Chào mừng bạn đến với hệ thống lớp học myclassroom</h3>
                <p>Bạn đã chọn tính năng Quên mật khẩu.</p>
                <p>Để tạo mật khẩu mới, vui lòng truy cập vào đường dẫn bên dưới</p>
                ${process.env.APP_URL}account/${code}
            </div>
        </div>
      `;
    mailService.SendMail({
      email,
      content,
    });

    return { success: true };
  },
};
