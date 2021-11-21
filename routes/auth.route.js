const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require('passport')

// Register
router.post("/register", authController.register);

// Login
router.post("/Login", authController.login);

router.get("/GetCurrentUser", passport.authenticate, authController.getCurrentUser);

module.exports = router;
