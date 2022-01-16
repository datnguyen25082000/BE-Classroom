const processResult = require("../utils/api-helper").processResult;
const adminService = require("../services/admin.service");

module.exports = {
  async getAll(req, res, next) {
    const result = await adminService.getAllAdmin();
    processResult(result, res);
  },
};
