const Attendance = require("../models/attendance");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(
        query.createdAt["$gte"].replace(/T.*Z/, "T00:00:00Z")
      );
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(
        query.createdAt["$lte"].replace(/T.*Z/, "T23:59:59Z")
      );
    }
    return await Attendance.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "attendance",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $addFields: {
          attendance: { $first: "$attendance" },
          employee: { $first: "$employee" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Attendance.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "attendance",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $addFields: {
          attendance: { $first: "$attendance" },
          employee: { $first: "$employee" },
        },
      },
      { $limit: 1 },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function aggregate(query = {}) {
  try {
    return await Attendance.aggregate(query).exec();
  } catch (err) {
    throw err;
  }
}

async function count(query = {}) {
  try {
    return await Attendance.count(query);
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Attendance(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Attendance.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Attendance.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, aggregate, count, create, update, remove };
