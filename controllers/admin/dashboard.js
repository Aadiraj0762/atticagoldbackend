const goldRateService = require("../../services/goldrate");
const customerService = require("../../services/customer");
const salesService = require("../../services/sales");

async function get(req, res) {
  const date = new Date().toISOString().replace(/T.*/, "");
  const goldRate = await goldRateService.findOne({
    date: date,
    state: "Karnataka",
    type: "gold",
  });

  res.json({
    status: true,
    message: "",
    data: {
      todayGoldRate: goldRate.rate,
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
      totalGrossWeight: 10,
      totalNetAmount: 10,
      totalExpenses: 10,
    },
  });
}

module.exports = { get };
