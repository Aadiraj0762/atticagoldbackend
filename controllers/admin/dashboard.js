const goldRateService = require("../../services/goldrate");
const customerService = require("../../services/customer");
const salesService = require("../../services/sales");
const expenseService = require("../../services/expense");

async function get(req, res) {
  const date = new Date().toISOString();
  const goldRate = await goldRateService.findOne({
    date: date,
    state: "Karnataka",
    type: "gold",
  });
  const totalGrossWeight = await salesService.aggregate([
    { $unwind: "$ornaments" },
    { $group: { _id: null, total: { $sum: "$ornaments.grossWeight" } } },
  ]);
  const totalNetAmount = await salesService.aggregate([
    { $unwind: "$ornaments" },
    { $group: { _id: null, total: { $sum: "$ornaments.netAmount" } } },
  ]);
  const totalExpenses = await expenseService.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  res.json({
    status: true,
    message: "",
    data: {
      todayGoldRate: goldRate?.rate ?? 0,
      todayCustomers: await customerService.count({
        createdAt: date,
      }),
      todayBills: await salesService.count({
        createdAt: date,
      }),
      todayPhysicalBills: await salesService.count({
        createdAt: date,
        saleType: "physical",
      }),
      todayPledgeBills: await salesService.count({
        createdAt: date,
        saleType: "pledge",
      }),
      totalGrossWeight: totalGrossWeight[0]?.total,
      totalNetAmount: totalNetAmount[0]?.total,
      totalExpenses: totalExpenses[0]?.total,
    },
  });
}

module.exports = { get };
