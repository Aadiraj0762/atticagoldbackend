const mongoose = require("mongoose");

const Fund = mongoose.model("fund", {
  amount: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  to: {
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

module.exports = Fund;
