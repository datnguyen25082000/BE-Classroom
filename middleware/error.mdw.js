module.exports = function (app) {
  app.use(function (req, res) {
    res.status(err.status || 404);
  });

  // default error handler
  app.use(function (err, req, res, next) {
    console.log("haha");
    console.error(err.stack);
    res.status(err.status || 500);
  });
};
