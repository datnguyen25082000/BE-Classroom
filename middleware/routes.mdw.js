const passport = require("passport");

module.exports = function (app) {
  // DEFAULT
  app.use("/", require("../routes/index.route"));

  // ROUTE ĐĂNG NHẬP ĐĂNG KÍ
  app.use("/api/auth", require("../routes/auth.route"));
  // ROUTE THAO TÁC VỚI TỪNG TÀI KHOẢN
  app.use("/api/users", passport.authenticate, require("../routes/users.route"));
  app.use("/api/courses", passport.authenticate, require("../routes/course.route"));
};
