const Notification = require("../models/notification");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(
        query.createdAt["$gte"].replace(/T.*Z/, "T00:00:00Z")
      ).toISOString();
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(
        query.createdAt["$lte"].replace(/T.*Z/, "T23:59:59Z")
      );
    }
    return await Notification.find(query).sort({ createdAt: -1 }).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Notification.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Notification(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Notification.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Notification.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
