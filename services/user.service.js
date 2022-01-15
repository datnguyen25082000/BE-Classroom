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
      return { error: errorMessageConstants.USERNAME_NOT_EXIST };
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.user_password
    );
    if (!isCorrectPassword) {
      return { error: errorMessageConstants.INCORRECT_PASSWORD };
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
      return { error: errorMessageConstants.USERNAME_ALREADY_EXISTS };
    }

    user = await userModel.findByEmail(email);
    if (user) {
      return { error: errorMessageConstants.EMAIL_ALREADY_EXISTS };
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
                ${process.env.APP_URL}account-active?code=${code}
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
      return { error: errorMessageConstants.USER_WITH_THIS_EMAIL_NOT_EXISTS };
    }

    if (user.user_is_active === userActiveStatusConstant.ACTIVE) {
      return { error: errorMessageConstants.USER_ALREADY_ACTIVATED };
    }

    user.user_is_active = userActiveStatusConstant.ACTIVE;

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

  async updateInfo(userId, data) {
    const user = await userModel.findByUserId(userId);

    if (user) {
      const {
        user_displayname,
        user_address,
        user_email,
        user_studentid,
        user_phone,
        user_nameinroom,
      } = data;

      await userModel.patch({
        ...user,
        user_displayname,
        user_address,
        user_email,
        user_studentid,
        user_phone,
        user_nameinroom,
      });
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
      return { error: errorMessageConstants.USER_WITH_THIS_EMAIL_NOT_EXISTS };
    }

    const otp = Math.random().toString().slice(-6);
    user.user_otp = otp;
    await userModel.patch(user);

    const content = `
        <div style="padding: 10px">
            <div>
                <h1>NTD MY CLASSROOM</h1>
                <h3>Chào mừng bạn đến với hệ thống lớp học myclassroom</h3>
                <p>Bạn đã chọn tính năng Quên mật khẩu.</p>
                <p>Vui lòng sử dụng mã sau để tạo mật khẩu mới:</p>
                ${otp}
            </div>
        </div>
      `;
    mailService.SendMail({
      email,
      content,
    });

    return { success: true };
  },

  async resetPassword(email, otp, newPassword) {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return { error: errorMessageConstants.USER_WITH_THIS_EMAIL_NOT_EXISTS };
    }

    if (!user.user_otp || user.user_otp !== otp) {
      return { error: errorMessageConstants.INVALID_OTP };
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.user_password = hashPassword;
    user.user_otp = null;
    await userModel.patch(user);

    return {
      success: true,
      data: {
        username: user.user_username,
      },
    };
  },

  async changePassword(currentPassword, newPassword, currentUser) {
    const user = await userModel.findByUsername(currentUser);

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.user_password
    );
    if (!isCorrectPassword) {
      return { error: errorMessageConstants.INCORRECT_PASSWORD };
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    user.user_password = newHashPassword;

    await userModel.patch(user);

    return {
      data: user,
    };
  },
};
