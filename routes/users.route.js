var express = require("express");
var router = express.Router();
const userModel = require("../model/user.model");

const defaultRes = {
  result: 0,
  message: "",
  content: {},
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/GetCurrentUser", async function (req, res, next) {
  const { username } = req.user;

  const user = await userModel.single(username);
  console.log("haha", user);
  res.json({
    ...defaultRes,
    content: {
      user: user,
    },
  });
});

module.exports = router;
