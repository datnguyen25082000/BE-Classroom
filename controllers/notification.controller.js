const notificationService = require("../services/notification.service");
const processResult = require("../utils/api-helper").processResult;

module.exports = {
  async getAll(req, res, next) {
    const result = await notificationService.getAllByUser(req.user);
    processResult(result, res);
    },
    
  async markAllAsRead(req, res, next) {
    const result = await notificationService.markAllAsRead(req.user);
    processResult(result, res);
  },

  async markAsRead(req, res, next) {
    const result = await notificationService.markAsRead(
      req.user,
      req.query.id
    );

    processResult(result, res);
  },
};
