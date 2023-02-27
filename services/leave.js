const Leave = require("../models/leave");

async function find(query = {}) {
  try {
    return await Leave.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Leave.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let leave = new Leave(payload);
    return await leave.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Leave.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Leave.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
