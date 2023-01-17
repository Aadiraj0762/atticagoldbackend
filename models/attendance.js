const mongoose = require("mongoose");

const Attendance = mongoose.model("attendances", {
  employeeId: {
    type: String,
    required: true,
  },
  employeePhoto: {
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

module.exports = Attendance;
