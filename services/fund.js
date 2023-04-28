const Fund = require("../models/fund");

async function find(query = {}) {
  try {
    return await Fund.find(query).populate("from").populate("to").exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Fund.findById(id).populate("from").populate("to").exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Fund(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Fund.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Fund.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
