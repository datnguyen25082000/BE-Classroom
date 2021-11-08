module.exports = function (app) {
  app.use(async function (req, res, next) {
    try {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

      // res.locals.user = req.session.user;
      next();
    } catch (error) {
      next();
    }
  });

  // app.use(async function (req, res, next) {
  //   const rows = await categoryModel.allWithDetails();
  //   res.locals.lcCategories = rows;
  //   next();
  // })
};
