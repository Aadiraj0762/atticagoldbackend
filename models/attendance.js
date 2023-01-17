const mongoose = require("mongoose");

const Attendance = mongoose.model(
  "attendances",
  mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },
      employeePhoto: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Attendance;
