const mongoose = require("mongoose");

const Ornament = mongoose.model("ornament", {
  ornaments: String,
  count: String,
  gross: String,
  stone: String,
  gold_rate: String,
  netWeight: String,
  purity: String,
  grossAmount: String,
  customer: String,
  date: String,
  time: String,
  margin: String,
  net_amount: String,
  emp_id: String,
});

export default Ornament;
