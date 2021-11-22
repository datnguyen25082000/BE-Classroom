const userService = require("../services/user.service");
const errorMessageConstants = require("../constants/error-message.constants");
const displayMessageConstants = require("../constants/display-message.constants");
const jwt = require("jsonwebtoken");

const jwtOptions = {
  secretOrKey: process.env.JWTPRIVATEKEY,
};

module.exports = {
  async register(req, res) {
    const { username, password, fullname } = req.body;

    const result = await userService.registerUser(username, password, fullname);

    const defaultRes = {
      result: 0,
      message: displayMessageConstants.REGISTER_USER_FAILED,
      content: {},
    };

    if (result.success) {
      res.json({
        ...defaultRes,
        message: displayMessageConstants.REGISTER_USER_SUCCESSFULLY,
      });
    } else if (result.data === errorMessageConstants.USERNAME_ALREADY_EXISTS) {
      res.status(200).json({
        ...defaultRes,
        message: displayMessageConstants.USERNAME_ALREADY_EXISTS,
      });
    } else {
      res.status(200).json(defaultRes);
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    const defaultRes = {
      result: 0,
      message: displayMessageConstants.LOGIN_FAILED,
      content: {},
    };

    const result = await userService.authenticateUser(username, password);

    if (result.success) {
      var payload = { username };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        result: 1,
        message: displayMessageConstants.LOGIN_SUCCESSFULLY,
        content: {
          token: token,
        },
      });
    } else if (result.data === errorMessageConstants.USERNAME_NOT_EXIST) {
      res.json({
        ...defaultRes,
        message: displayMessageConstants.USERNAME_NOT_EXIST,
      });
    } else if (result.data === errorMessageConstants.INCORRECT_PASSWORD) {
      res.status(200).json({
        ...defaultRes,
        message: displayMessageConstants.INCORRECT_PASSWORD,
      });
    } else {
      res.json(defaultRes);
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

    console.log("email", email);

    res.redirect("https://w3schools.com");
  },
};
