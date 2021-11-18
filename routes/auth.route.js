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
router.post("/Login", authController.login);

module.exports = router;
