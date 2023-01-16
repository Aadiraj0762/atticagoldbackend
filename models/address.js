const mongoose = require("mongoose");

const Address = mongoose.model("addresses", {
  type: {
    type: String,
    required: true,
  },
  typeid: {
    type: String,
    required: true,
  },
  addrline: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  residential: {
    type: String,
    required: true,
  },
  addrproof: {
    type: String,
    required: true,
  },
  proofid: {
    type: String,
    required: true,
  },
  proofupload: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
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

module.exports = Address;
