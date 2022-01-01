var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("My classroom system APIs");
});

module.exports = router;
