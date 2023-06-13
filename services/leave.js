const Leave = require("../models/leave");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(query.createdAt["$gte"]);
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(query.createdAt["$lte"]);
    }
    return await Leave.find(query)
      .populate("employee")
      .populate("branch")
      .exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Leave.findById(id)
      .populate("employee")
      .populate("branch")
      .exec();
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
