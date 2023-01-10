const mongoose = require("mongoose");

const Fund = mongoose.model("fund", {
  amount: String,
  branch: String,
  status: String,
  date: String,
  time: String,
});

export default Fund;
