const Employee = require("../models/employee");
const User = require("../models/user");

async function find(query = {}) {
  try {
    return await Employee.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Employee.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function findByBranchId(id) {
  try {
    return await User.aggregate([
      { $match: { username: id } },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $project: { _id: 0, employee: 1 } },
      { $unwind: "$employee" },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Employee(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Employee.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Employee.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, findByBranchId, create, update, remove };
