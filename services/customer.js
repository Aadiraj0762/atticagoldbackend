const Customer = require("../models/customer");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(query.createdAt["$gte"]);
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(query.createdAt["$lte"]);
    }
    return await Customer.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "profileImage",
        },
      },
      {
        $addFields: {
          profileImage: { $first: "$profileImage" },
        },
      },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Customer.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "profileImage",
        },
      },
      {
        $addFields: {
          profileImage: { $first: "$profileImage" },
        },
      },
      { $limit: 1 },
    ]).exec();
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
    return await Customer.count(query);
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    const latestSeq = await Customer.findOne({})
      .sort({ customerIdSeq: -1 })
      .exec();
    payload.customerIdSeq = (latestSeq?.customerIdSeq ?? 0) + 1;
    let customer = new Customer(payload);
    return await customer.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Customer.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Customer.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, count, create, update, remove };
