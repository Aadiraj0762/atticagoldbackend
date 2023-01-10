const mongoose = require("mongoose");

const GoldRate = mongoose.model("goldRate", {
  rate: String,
  type: String,
  state: String,
  date: String,
  time: String,
});

export default GoldRate;
