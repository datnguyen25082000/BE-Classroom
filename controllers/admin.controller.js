const processResult = require("../utils/api-helper").processResult;
const adminService = require("../services/admin.service");

module.exports = {
  async getAll(req, res, next) {
    const result = await adminService.getAllAdmin();
    processResult(result, res);
  },

  async add(req, res, next) {
    const result = await adminService.add(
      req.body.username,
      req.body.password,
      req.body.display_name,
      req.body.email
    );
    processResult(result, res);
  },
};
