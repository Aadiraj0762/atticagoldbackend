const mongoose = require("mongoose");

const Notification = mongoose.model("notifications", {
  notificationType: {
    type: String,
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
  branchId: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = Notification;
