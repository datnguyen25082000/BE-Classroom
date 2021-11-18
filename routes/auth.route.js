const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {
  secretOrKey: process.env.JWTPRIVATEKEY,
};
var jwt = require("jsonwebtoken");

const User = require("../model/user.model");

// Register
router.post("/register", authController.register);

// Login
router.post("/Login", async (req, res) => {
  const { username, password } = req.body;
  
  const defaultRes = {
    result: 0,
    message: "Tài khoản không tồn tại",
    content: {},
  };

  if (username && password) {
    var user = await User.single(username);

    if (!user) {
      res.status(200).json(defaultRes);
    }
    if (user && user.user_password === password) {
      var payload = { username: user.user_username };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        result: 1,
        message: "Đăng nhập thành công",
        content: {
          token: token,
        },
      });
    } else {
      res
        .status(200)
        .json({ ...defaultRes, message: "Mật khẩu không chính xác" });
    }
  } else res.status(200).json(defaultRes);
});

module.exports = router;
