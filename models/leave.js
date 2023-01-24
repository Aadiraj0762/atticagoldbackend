const mongoose = require("mongoose");

const Leave = mongoose.model(
  "leaves",
  mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },
      branchId: {
        type: String,
        required: true,
      },
      leaveType: {
        type: String,
        required: true,
      },
      dates: [Date],
      proof: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Leave;
