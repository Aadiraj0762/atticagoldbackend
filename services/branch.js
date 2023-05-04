const Branch = require("../models/branch");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    return await Branch.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "image",
        },
      },
      {
        $addFields: {
          image: { $first: "$image" },
        },
      },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    const data = await Branch.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "image",
        },
      },
      {
        $addFields: {
          image: { $first: "$image" },
        },
      },
      { $limit: 1 },
    ]).exec();
    return data[0] ?? {};
  } catch (err) {
    throw err;
  }
}

async function findOne(query) {
  try {
    const data = await Branch.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "image",
        },
      },
      {
        $addFields: {
          image: { $first: "$image" },
        },
      },
      { $limit: 1 },
    ]).exec();
    return data[0] ?? {};
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Branch(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Branch.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Branch.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, findOne, create, update, remove };
