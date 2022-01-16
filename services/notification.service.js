const notificationModel = require("../model/notification.model");

const error = require("../constants/error-message.constants");

const helper = require("../utils/service-helper");
const fail = helper.getFailResponse;
const success = helper.getSuccessResponse;

module.exports = {
  async getAllByUser(current_user) {
    const allNotifications = await notificationModel.getAllByUserId(
      current_user.user_id
    );
    return success(allNotifications);
  },
  async markAllAsRead(current_user) {
    await notificationModel.markAllAsReadByUserId(current_user.user_id);
    const allNotifications = await notificationModel.getAllByUserId(
      current_user.user_id
    );
    return success(allNotifications);
  },

  async markAsRead(current_user, notification_id) {
    const notification = await notificationModel.getById(notification_id);
    if (notification.user_id !== current_user.user_id) {
      return fail(error.NOT_HAVE_PERMISSION);
    }

    await notificationModel.patch({ ...notification, isRead: true });
    return success({ ...notification, isRead: true });
  },
};
