const balanceSheetService = require("../../services/balancesheet");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await balanceSheetService.find(req.body ?? {}),
  });
}

module.exports = { find };
