const userService = require("../services/user.service");
const errorMessageConstants = require("../constants/error-message.constants");
const displayMessageConstants = require("../constants/display-message.constants");

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
    } else if (
      result.data === errorMessageConstants.USERNAME_ALREADY_EXISTS
    ) {
      res.status(200).json({
        ...defaultRes,
        message: displayMessageConstants.USERNAME_ALREADY_EXISTS,
      });
    } else {
      res.status(200).json(defaultRes);
    }
  },
};
