const GoldRate = require("../models/goldrate");

async function find(query = {}) {
  try {
    if (query.date) {
      if (typeof query.date == "object") {
        if ("$gte" in query.date) {
          query.date["$gte"] = new Date(
            query.date["$gte"].replace(/T.*Z/, "T00:00:00Z")
          ).toISOString();
        }
        if ("$lte" in query.date) {
          query.date["$lte"] = new Date(
            query.date["$lte"].replace(/T.*Z/, "T23:59:59Z")
          ).toISOString();
        }
      } else {
        const date = new Date(query.date);
        query.date = {
          $gte: date,
          $lt: new Date(date.getTime() + 86400000),
        };
      }
    }
    if (query.state) {
      query.state = { $regex: new RegExp(`^${query.state}$`, "i") };
    }
    return await GoldRate.find(query).sort({ createdAt: -1 }).exec();
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
    if (query.state) {
      query.state = { $regex: new RegExp(`^${query.state}$`, "i") };
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
