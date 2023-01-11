const mongoose = require("mongoose");

const GoldRate = mongoose.model("goldRate", {
  rate: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  state: {
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

module.exports = GoldRate;
