const Branch = require("../models/branch");

async function find(query = {}) {
  try {
    let fromDate = new Date();
    fromDate.setUTCHours(0, 0, 0, 0);
    let toDate = new Date();
    toDate.setUTCHours(23, 59, 59, 0);

    if (query.fromDate) {
      fromDate = new Date(query.fromDate.replace(/T.*Z/, "T00:00:00Z"));
      delete query.fromDate;
    }
    if (query.toDate) {
      toDate = new Date(query.toDate.replace(/T.*Z/, "T23:59:59Z"));
      delete query.toDate;
    }

    return await Branch.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "funds",
          let: { branchId: "$_id" },
          pipeline: [
            {
              $match: {
                $or: [
                  { $expr: { $eq: ["$from", "$$branchId"] } },
                  { $expr: { $eq: ["$to", "$$branchId"] } },
                ],
              },
            },
            {
              $group: {
                _id: null,
                fundRequested: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ["$from", "$$branchId"] },
                          { $eq: ["$type", "fund_request"] },
                        ],
                      },
                      "$amount",
                      0,
                    ],
                  },
                },
                fundTransferred: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ["$from", "$$branchId"] },
                          { $eq: ["$type", "fund_transfer"] },
                        ],
                      },
                      "$amount",
                      0,
                    ],
                  },
                },
                fundReceived: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ["$to", "$$branchId"] },
                          { $eq: ["$type", "fund_transfer"] },
                        ],
                      },
                      "$amount",
                      0,
                    ],
                  },
                },
              },
            },
          ],
          as: "funds",
        },
      },
      {
        $lookup: {
          from: "sales",
          localField: "_id",
          foreignField: "branch",
          pipeline: [
            {
              $group: {
                _id: null,
                totalSale: {
                  $sum: "$netAmount",
                },
              },
            },
          ],
          as: "sales",
        },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "branch",
          pipeline: [
            {
              $group: {
                _id: null,
                totalExpense: {
                  $sum: "$amount",
                },
              },
            },
          ],
          as: "expenses",
        },
      },
      {
        $addFields: {
          funds: { $first: "$funds" },
          sales: { $first: "$sales" },
          expenses: { $first: "$expenses" },
        },
      },
      {
        $addFields: {
          fundRequested: { $ifNull: ["$funds.fundRequested", 0] },
          fundTransferred: { $ifNull: ["$funds.fundTransferred", 0] },
          fundReceived: { $ifNull: ["$funds.fundReceived", 0] },
          totalSale: { $ifNull: ["$sales.totalSale", 0] },
          totalExpense: { $ifNull: ["$expenses.totalExpense", 0] },
        },
      },
      {
        $addFields: {
          openingBalance: 0,
          closingBalance: {
            $sum: [
              {
                $subtract: [
                  {
                    $subtract: ["$fundRequested", "$fundTransferred"],
                  },
                  {
                    $subtract: ["$totalSale", "$totalExpense"],
                  },
                ],
              },
              "$fundReceived",
            ],
          },
        },
      },
      {
        $project: {
          branchId: 1,
          branchName: 1,
          fundRequested: 1,
          fundTransferred: 1,
          fundReceived: 1,
          totalSale: 1,
          totalExpense: 1,
          openingBalance: 1,
          closingBalance: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find };
