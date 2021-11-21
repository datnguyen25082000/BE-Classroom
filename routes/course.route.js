const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

/* GET home page. */
router.get("/GetAllCourse", courseController.getAll);

router.post("/AddCourse", courseController.add);

router.post("/DeleteCourse", courseController.delete);

router.get("/GetOneCourse", courseController.get);

module.exports = router;
