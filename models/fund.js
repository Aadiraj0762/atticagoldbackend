const mongoose = require("mongoose");

const Fund = mongoose.model("fund", {
  amount: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  status: {
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

module.exports = Fund;
