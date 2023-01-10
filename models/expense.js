const mongoose = require("mongoose");

const Expense = mongoose.model("expense", {
  type: String,
  amount: String,
  status: String,
  date: String,
  time: String,
  username: String,
});

export default Expense;
