const express = require("express");
const router = express.Router();
const passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {
  secretOrKey: process.env.JWTPRIVATEKEY,
};
var jwt = require("jsonwebtoken");

const User = require("../model/user.model");

// Register
router.post("/register", async (req, res) => {
  const { username, password, fullname } = req.body;

  if (username && password) {
    var user = await User.single(username);

    const defaultRes = {
      result: 0,
      message: "Đăng ký thất bại",
      content: {},
    };

    if (user) {
      res
        .status(200)
        .json({ ...defaultRes, message: "Tên đăng nhập đã tồn tại" });
    } else {
      const newUser = {
        user_username: username,
        user_password: password,
        user_displayname: fullname,
      };
      User.add(newUser);

      res.json({ ...defaultRes, message: "Đăng ký tài khoản thành công" });
    }
  }
});

// Login
router.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    var user = await User.single(username);

    const defaultRes = {
      result: 0,
      message: "Tài khoản không tồn tại",
      content: {},
    };

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
