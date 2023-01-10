const mongoose = require("mongoose");

const Upload = mongoose.model("upload", {
  cid: String,
  file: String,
  sign: String,
  idCustomer: String,
  date: String,
  time: String,
});

export default Upload;
