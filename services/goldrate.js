const GoldRate = require("../models/goldrate");

async function find(query = {}) {
  try {
    return await GoldRate.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await GoldRate.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new GoldRate(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await GoldRate.findByIdAndUpdate(id, payload).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await GoldRate.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
