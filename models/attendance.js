const mongoose = require("mongoose");

const Attendance = mongoose.model(
  "attendances",
  mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },
      attendanceDate: {
        type: Date,
        required: true,
        default: new Date(),
      },
    },
    { timestamps: true }
  )
);

module.exports = Attendance;
