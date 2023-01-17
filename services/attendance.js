const Attendance = require("../models/attendance");

async function find(query = {}) {
  try {
    return await Attendance.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Attendance.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Attendance(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Attendance.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Attendance.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
