const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const passport = require("passport");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: "./public/assets/avatar/",
  filename: function (req, file, cb) {
    const { user_username } = req.user;
    cb(
      null,
      Date.now() +
        user_username.substring(1, 10) +
        file.originalname.substring(file.originalname.length - 10)
    );
  },
});

var upload = multer({ storage: storage });

// route

router.get("/GetCurrentUser", userController.getUserInfo);

router.get("/GetUserInfo", userController.getUserInfo);

router.post("/UpdateInfo", userController.updateInfo);

router.post(
  "/UpdateAvatar",
  upload.single("image"),
  userController.updateAvatar
);

router.get("/find-user-by-student-id", userController.findUserByStudentId);

module.exports = router;
