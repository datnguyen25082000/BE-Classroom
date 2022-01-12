const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require("passport");

// Register
router.post("/register", authController.register);

// Login
router.post("/Login", authController.login);

router.post("/activate-user", authController.activateUser)

router.post("/forgot-password", authController.forgotPassword)

router.post("/reset-password", authController.resetPassword)

router.get(
  "/GetCurrentUser",
  passport.authenticate,
  authController.getCurrentUser
);

// acceptInvite
router.get("/AcceptInvite", authController.acceptInvite);

module.exports = router;
