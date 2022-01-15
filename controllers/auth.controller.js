const userService = require("../services/user.service");
const errorMessageConstants = require("../constants/error-message.constants");
const displayMessageConstants = require("../constants/display-message.constants");
const jwt = require("jsonwebtoken");
const processResult = require("../utils/api-helper").processResult;

const jwtOptions = {
  secretOrKey: process.env.JWTPRIVATEKEY,
};

module.exports = {
  async register(req, res) {
    const { username, password, fullname, email } = req.body;

    const result = await userService.registerUser(
      username,
      password,
      fullname,
      email
    );

    processResult(result, res);
  },

  async login(req, res) {
    const { username, password } = req.body;

    const defaultRes = {
      result: 0,
      message: displayMessageConstants.LOGIN_FAILED,
      content: {},
    };

    const result = await userService.authenticateUser(username, password);

    if (!result.error) {
      var payload = { username };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        result: 1,
        message: displayMessageConstants.LOGIN_SUCCESSFULLY,
        content: {
          token: token,
        },
      });
    } else {
      res.json({
        ...defaultRes,
        message: result.error,
      });
    }
  },

  async getCurrentUser(req, res, next) {
    const { user_username } = req.user;

    const result = await userService.findUserByUsername(user_username, 0);

    const user = {
      user_username: result.user_username,
      user_id: result.user_id,
      user_displayname: result.user_displayname,
    };

    res.json({
      result: 0,
      message: "",
      content: {
        user: user,
      },
    });
  },

  async acceptInvite(req, res, next) {
    const { token } = req.query;

    const { email, course_id, teacher_invite } = jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION
    );

    res.redirect("https://w3schools.com");
  },

  async activateUser(req, res, next) {
    const result = await userService.activateUser(req.body.code);
    processResult(result, res);
  },

  async forgotPassword(req, res, next) {
    const result = await userService.forgotPassword(req.body.email);
    processResult(result, res);
  },

  async resetPassword(req, res, next) {
    const result = await userService.resetPassword(
      req.body.email,
      req.body.otp,
      req.body.newPassword
    );
    processResult(result, res);
  },
};
