const Branch = require("../models/branch");

async function find(query = {}) {
  try {
    return await Branch.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Branch.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Branch(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Branch.findByIdAndUpdate(id, payload).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Branch.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
