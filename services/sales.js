const Sales = require("../models/sales");

async function find(query = {}) {
  try {
    return await Sales.find(query)
      .populate("branch")
      .populate("customer")
      .populate("release")
      .exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Sales.findById(id)
      .populate("branch")
      .populate("customer")
      .populate("release")
      .exec();
  } catch (err) {
    throw err;
  }
}

async function count(query = {}) {
  try {
    if (query.createdAt) {
      const createdAt = new Date(query.createdAt);
      query.createdAt = {
        $gte: createdAt,
        $lt: new Date(createdAt.getTime() + 86400000),
      };
    }
    return await Sales.count(query);
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Sales(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Sales.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Sales.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, count, create, update, remove };
