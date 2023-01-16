const mongoose = require("mongoose");

const Attendance = mongoose.model("attendance", {
  empid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = Attendance;
