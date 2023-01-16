const mongoose = require("mongoose");

const UploadProof = mongoose.model("uploadproof", {
  type: {
    type: String,
    required: true,
  },
  typeid: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  file: {
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

module.exports = UploadProof;
