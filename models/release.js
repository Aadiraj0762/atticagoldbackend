const mongoose = require("mongoose");

const Release = mongoose.model("releases", {
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  pledgeamount: {
    type: String,
    required: true,
  },
  payableamount: {
    type: String,
    required: true,
  },
  pledgeddate: {
    type: String,
    required: true,
  },
  pledgedin: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  pledgeid: {
    type: String,
    required: true,
  },
  attach: {
    type: String,
    required: true,
  },
  releasedate: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  empid: {
    type: String,
    required: true,
  },
  cusid: {
    type: String,
    required: true,
  },
  status: {
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

module.exports = Release;
