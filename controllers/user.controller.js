const userService = require("../services/user.service");
const API_SOURCE_URL = process.env.API_SOURCE_URL;
const processResult = require('../utils/api-helper').processResult

module.exports = {
  async getUserInfo(req, res, next) {
    const { user_username } = req.user;

    const user = await userService.findUserByUsername2(user_username);

    const data = {
      user_displayname: user.user_displayname,
      user_phone: user.user_phone,
      user_email: user.user_email,
      user_avatar: user.user_avatar,
      user_address: user.user_address,
      user_studentid: user.user_studentid,
      user_nameinroom: user.user_nameinroom,
      user_id: user.user_id,
    };

    res.json({
      result: 0,
      message: "",
      content: {
        user: data,
      },
    });
  },

  async updateInfo(req, res, next) {
    const data = ({
      user_displayname,
      user_address,
      user_email,
      user_studentid,
      user_phone,
      user_nameinroom,
    } = req.body);

    const { user_username } = req.user;

    const result = await userService.updateInfo(user_username, data);

    res.json({
      result: 0,
      message: "",
      content: {
        update: result || false,
      },
    });
  },

  async updateAvatar(req, res, next) {
    const { user_username } = req.user;

    const data = {
      user_avatar: req.file ? API_SOURCE_URL + req.file.filename : "",
    };

    const result = await userService.updateInfo(user_username, data);

    res.json({
      result: 0,
      message: "",
      content: {
        update: result || false,
      },
    });
  },

  async findUserByStudentId(req, res, next) {
    const user = await userService.findUserByStudentId(req.query.studentId);
    res.json({
      result: 0,
      message: "",
      content: user,
    });
  },

  async changePassword(req, res, next) {
    const { currentPassword, newPassword } = req.body
    const result = await userService.changePassword(
      currentPassword,
      newPassword,
      req.user.user_username
    );

    processResult(result, res)
  }
};
