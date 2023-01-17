const mongoose = require("mongoose");

const GoldRate = mongoose.model(
  "goldRates",
  mongoose.Schema(
    {
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
    },
    { timestamps: true }
  )
);

module.exports = GoldRate;
