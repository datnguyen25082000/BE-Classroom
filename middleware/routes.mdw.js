const authMiddleware = require("../middleware/auth.mdw");

module.exports = function (app) {
  // DEFAULT
  app.use("/", require("../routes/index.route"));

  // ROUTE ĐĂNG NHẬP ĐĂNG KÍ
  app.use("/api/auth", require("../routes/auth.route"));
  // ROUTE THAO TÁC VỚI TỪNG TÀI KHOẢN
  app.use("/api/users", authMiddleware, require("../routes/users.route"));
  app.use("/api/courses", authMiddleware, require("../routes/course.route"));
};
