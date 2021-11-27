const express = require("express");
const router = express.Router();
const assignmentCategoryController = require('../controllers/assignment-category.controller')

/* GET home page. */
router.post('/add', assignmentCategoryController.add)
router.post('/update', assignmentCategoryController.update)
router.post('/update-position', assignmentCategoryController.updatePosition)
router.post('/delete', assignmentCategoryController.delete)

module.exports = router;
