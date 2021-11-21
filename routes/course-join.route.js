const express = require("express");
const router = express.Router();
const courseJoinController = require("../controllers/course-join.controller");

/* GET home page. */
router.get("/GetAllCourses", courseJoinController.getAllCourses);
router.get("/AllMembers", courseJoinController.getAllMembersOfCourse)
router.get("/JoinCourse", courseJoinController.joinCourse)

module.exports = router;
