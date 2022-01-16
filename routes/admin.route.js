const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

const isSuperAdmin = (req, res, next) => {
  if (req.account.super_admin) {
    next();
  }
  res.status(401);
};

router.get("/get-all", isSuperAdmin, adminController.getAll);

module.exports = router;
