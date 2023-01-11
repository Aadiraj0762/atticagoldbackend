const User = require("../models/user");

async function find(query = {}) {
  try {
    return await User.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await User.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new User(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await User.findByIdAndUpdate(id, payload).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await User.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
