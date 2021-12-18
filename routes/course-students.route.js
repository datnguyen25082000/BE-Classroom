const express = require("express");
const router = express.Router();
const courseStudentsController = require('../controllers/course-students.controller')

/* GET home page. */
router.get("/get-all-by-course", courseStudentsController.getAllByCourse);
router.post("/add-many-by-course", courseStudentsController.addManyByCourse);

module.exports = router;
