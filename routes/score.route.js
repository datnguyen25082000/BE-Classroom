const express = require("express");
const scoreController = require("../controllers/score.controller");
const router = express.Router();

/* GET home page. */
router.post("/add-many-by-assignment-category", scoreController.addManyByAssignmentCategory);
router.get("/get-all-by-course", scoreController.getAllByCourse)

module.exports = router;
