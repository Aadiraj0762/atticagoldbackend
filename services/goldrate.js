const GoldRate = require("../models/goldrate");

async function find(query = {}) {
  try {
    if (query.date) {
      const date = new Date(query.date);
      query.date = {
        $gte: date,
        $lt: new Date(date.getTime() + 86400000),
      };
    }
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
    if (query.date) {
      const date = new Date(query.date);
      query.date = {
        $gte: date,
        $lt: new Date(date.getTime() + 86400000),
      };
    }
    return await GoldRate.findOne(query).exec();
  } catch (err) {
    throw err;
  }
}

async function latest(query) {
  try {
    return await GoldRate.findOne(query).sort({ createdAt: -1 }).exec();
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

module.exports = {
  find,
  findById,
  findOne,
  latest,
  create,
  update,
  remove,
};
