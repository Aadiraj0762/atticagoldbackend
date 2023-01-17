const Customer = require("../models/customer");

async function find(query = {}) {
  try {
    return await Customer.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Customer.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Customer(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Customer.findByIdAndUpdate(id, payload).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Customer.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
