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
async function findOne(query) {
  try {
    return await GoldRate.findOne(query).exec();
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
    return await GoldRate.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await GoldRate.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, findOne, create, update, remove };
