const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Register
router.post("/register", authController.register);

// Login
router.post("/Login", authController.login);

module.exports = router;
