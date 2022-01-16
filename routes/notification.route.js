const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/mark-all-as-read", notificationController.markAllAsRead);
router.get("/mark-as-read", notificationController.markAsRead);
router.get("/get-all", notificationController.getAll);

module.exports = router;
