const express = require("express");
const router = express.Router();
const assignmentCategoryController = require("../controllers/assignment-category.controller");

/* GET home page. */
router.get("/get-all-by-course", assignmentCategoryController.getAllByCourse);
router.post("/add", assignmentCategoryController.add);
router.post("/update", assignmentCategoryController.update);
router.post("/update-position", assignmentCategoryController.updatePosition);
router.post("/delete", assignmentCategoryController.delete);
router.post("/finalize", assignmentCategoryController.finalize);

module.exports = router;
