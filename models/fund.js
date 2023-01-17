const mongoose = require("mongoose");

const Fund = mongoose.model(
  "fund",
  mongoose.Schema(
    {
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
    },
    { timestamps: true }
  )
);

module.exports = Fund;
