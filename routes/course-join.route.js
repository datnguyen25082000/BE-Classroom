const express = require("express");
const router = express.Router();
const courseJoinController = require("../controllers/course-join.controller");

/* GET home page. */
router.get("/GetAllCourses", courseJoinController.getAllCourses);
router.get("/AllMembers", courseJoinController.getAllMembersOfCourse)
router.get("/JoinCourse", courseJoinController.joinCourse)
router.post("/InviteViaEmail", courseJoinController.inviteViaEmail);
router.post("/LeaveCourse", courseJoinController.leaveCourse);
router.get("/GetInvitationCode", courseJoinController.getInvitationCode)
router.get("/JoinCourseViaInvitationCode", courseJoinController.joinCourseViaInvitationCode)

module.exports = router;
