const mongoose = require("mongoose");

const Salary = mongoose.model("salary", {
  empid: {
    type: String,
    required: true,
  },
  salarydays: {
    type: String,
    required: true,
  },
  leaves: {
    type: String,
    required: true,
  },
  allowances: {
    type: String,
    required: true,
  },
  deductions: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  advance: {
    type: String,
    required: true,
  },
  payable: {
    type: String,
    required: true,
  },
  month: {
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

module.exports = Salary;
