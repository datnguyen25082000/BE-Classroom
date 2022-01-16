const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

const isSuperAdmin = (req, res, next) => {
  if (req.account.super_admin) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.get("/get-all", isSuperAdmin, adminController.getAll);
router.post("/add", isSuperAdmin, adminController.add);
router.get("/all-user", adminController.getAllUser);

module.exports = router;
