const mongoose = require("mongoose");

const Branch = mongoose.model("branch", {
  branchid: {
    type: String,
    unique: true,
  },
  branch: String,
  addr: String,
  city: String,
  state: String,
  pincode: String,
  landmark: String,
  date: String,
  time: String,
});

export default Branch;
