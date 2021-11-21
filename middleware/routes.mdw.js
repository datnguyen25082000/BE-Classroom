const passport = require("passport");

module.exports = function (app) {
  // DEFAULT
  app.use("/", require("../routes/index.route"));

  app.use("/api/auth", require("../routes/auth.route"));
  app.use("/api/courses", passport.authenticate, require("../routes/course.route"));
  app.use("/api/course-join", passport.authenticate, require("../routes/course-join.route"));
};
