const passport = require("passport");

module.exports = function (app) {
  // DEFAULT
  app.use("/", require("../routes/index.route"));

  app.use("/api/auth", require("../routes/auth.route"));
  app.use(
    "/api/courses",
    passport.authenticate,
    require("../routes/course.route")
  );
  app.use(
    "/api/course-join",
    passport.authenticate,
    require("../routes/course-join.route")
  );
  app.use("/api/user", passport.authenticate, require("../routes/user.route"));
  app.use(
    "/api/assignment-category",
    passport.authenticate,
    require("../routes/assignment-category.route")
  );
  app.use(
    "/api/course-students",
    passport.authenticate,
    require("../routes/course-students.route")
  );
};
