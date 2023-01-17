const mongoose = require("mongoose");

const Salary = mongoose.model(
  "salaries",
  mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },
      salaryDays: {
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
      advanceSalary: {
        type: String,
        required: true,
      },
      salary: {
        type: String,
        required: true,
      },
      payableSalary: {
        type: String,
        required: true,
      },
      salaryMonth: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Salary;
