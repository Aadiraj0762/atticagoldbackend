const Employee = require("../models/employee");
const User = require("../models/user");

async function find(query = {}) {
  try {
    return await Employee.find(query).sort({ createdAt: -1 }).exec();
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
      { $unwind: "$employee" },
      {
        $project: {
          _id: "$employee._id",
          employeeId: "$employee.employeeId",
          name: "$employee.name",
          gender: "$employee.gender",
          dob: "$employee.dob",
          phoneNumber: "$employee.phoneNumber",
          alternatePhoneNumber: "$employee.alternatePhoneNumber",
          designation: "$employee.designation",
          status: "$employee.status",
          address: "$employee.address",
          createdAt: "$employee.createdAt",
          updatedAt: "$employee.updatedAt",
        },
      },
      { $sort: { createdAt: -1 } },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function aggregate(query = {}) {
  try {
    return await Employee.aggregate(query).exec();
  } catch (err) {
    throw err;
  }
}

async function count(query = {}) {
  try {
    if (query.createdAt) {
      const createdAt = new Date(query.createdAt);
      query.createdAt = {
        $gte: createdAt,
        $lt: new Date(createdAt.getTime() + 86400000),
      };
    }
    return await Employee.count(query);
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

module.exports = {
  find,
  findById,
  findByBranchId,
  aggregate,
  count,
  create,
  update,
  remove,
};
