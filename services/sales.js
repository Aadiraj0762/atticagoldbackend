const Sales = require("../models/sales");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(query.createdAt["$gte"]);
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(query.createdAt["$lte"]);
    }
    return await Sales.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "bank",
          let: { bankId: "$bank" },
          pipeline: [
            { $unwind: "$bank" },
            { $match: { $expr: { $eq: ["$bank._id", "$$bankId"] } } },
            { $replaceRoot: { newRoot: "$bank" } },
          ],
        },
      },
      {
        $lookup: {
          from: "branches",
          localField: "branch",
          foreignField: "_id",
          as: "branch",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "releases",
          localField: "release",
          foreignField: "_id",
          as: "release",
        },
      },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "proof",
        },
      },
      {
        $addFields: {
          branch: { $first: "$branch" },
          customer: { $first: "$customer" },
          bank: { $first: "$bank" },
        },
      },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    const sales = await Sales.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "bank",
          let: { bankId: "$bank" },
          pipeline: [
            { $unwind: "$bank" },
            { $match: { $expr: { $eq: ["$bank._id", "$$bankId"] } } },
            { $replaceRoot: { newRoot: "$bank" } },
          ],
        },
      },
      {
        $lookup: {
          from: "branches",
          localField: "branch",
          foreignField: "_id",
          as: "branch",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "releases",
          localField: "release",
          foreignField: "_id",
          as: "release",
        },
      },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "proof",
        },
      },
      {
        $addFields: {
          branch: { $first: "$branch" },
          customer: { $first: "$customer" },
          bank: { $first: "$bank" },
        },
      },
      { $limit: 1 },
    ]).exec();
    return sales[0];
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

async function aggregate(query = {}) {
  try {
    return await Sales.aggregate(query).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    payload.billId = Math.floor(100000 + Math.random() * 900000);
    let sale = new Sales(payload);
    return await sale.save();
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

module.exports = { find, findById, count, aggregate, create, update, remove };
