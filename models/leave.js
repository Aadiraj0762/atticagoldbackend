const mongoose = require("mongoose");

const Leave = mongoose.model("leaves", {
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
  dates: [
    mongoose.Schema({
      date: {
        type: Date,
        required: true,
      },
    }),
  ],
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
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = Leave;
