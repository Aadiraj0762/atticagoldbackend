const Release = require("../models/release");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(query.createdAt["$gte"]);
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(query.createdAt["$lte"]);
    }
    if (query.branch) {
      query.branch = new mongoose.Types.ObjectId(query.branch);
    } else {
      delete query.branch;
    }
    if (query.customer) {
      query.customer = new mongoose.Types.ObjectId(query.customer);
    } else {
      delete query.customer;
    }
    return await Release.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Release.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Release(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Release.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Release.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
