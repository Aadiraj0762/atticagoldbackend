const mongoose = require("mongoose");
const Sale = require("../models/sales");

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
    if (query.branch) {
      query.branch = new mongoose.Types.ObjectId(query.branch);
    } else {
      delete query.branch;
    }
    if (query.status) {
      query["ornaments.status"] = query.status;
      delete query.status;
    } else {
      delete query.status;
    }
    return await Sale.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "branches",
          localField: "branch",
          foreignField: "_id",
          as: "branch",
        },
      },
      {
        $unwind: "$ornaments",
      },
      {
        $addFields: {
          branch: { $first: "$branch" },
        },
      },
      {
        $project: {
          _id: "$ornaments._id",
          branchId: "$branch.branchId",
          branchName: "$branch.branchName",
          ornamentType: "$ornaments.ornamentType",
          quantity: "$ornaments.quantity",
          grossWeight: "$ornaments.grossWeight",
          stoneWeight: "$ornaments.stoneWeight",
          netWeight: "$ornaments.netWeight",
          purity: "$ornaments.purity",
          netAmount: "$ornaments.netAmount",
          status: "$ornaments.status",
        },
      },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function update(payload) {
  try {
    let data = {};
    let query = {};
    if (payload.status) {
      data["ornaments.$.status"] = payload.status;
    }
    data["ornaments.$.statusUpdatedAt"] = new Date();
    if (payload.id) {
      if (Array.isArray(payload.id)) {
        query["ornaments._id"] = {
          $in: payload.id.map((id) => new mongoose.Types.ObjectId(id)),
        };
      } else {
        query["ornaments._id"] = new mongoose.Types.ObjectId(payload.id);
      }
    } else {
      throw new Error("Id is required");
    }
    return await Sale.updateMany(
      query,
      { $set: data },
      {
        returnDocument: "after",
      }
    ).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, update };
