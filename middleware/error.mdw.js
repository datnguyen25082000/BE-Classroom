module.exports = function (app) {
  app.use(function (req, res) {
    res.status(err.status || 404);
  });

  // default error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  });
};
