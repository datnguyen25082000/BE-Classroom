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
  app.use(
    "/api/score",
    passport.authenticate,
    require("../routes/score.route")
  );
  app.use(
    "/api/score-review",
    passport.authenticate,
    require("../routes/score-review.route")
  );
  app.use(
    "/api/score-review-comment",
    passport.authenticate,
    require("../routes/score-review-comment.route")
  );
  app.use(
    "/api/notification",
    passport.authenticate,
    require("../routes/notification.route")
  );
  app.use(
    "/api/admin",
    passport.authorize,
    require("../routes/admin.route")
  );
};
