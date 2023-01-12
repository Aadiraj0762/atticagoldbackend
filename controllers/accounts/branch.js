const branchService = require("../../services/branch");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await branchService.find(),
  });
}

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: await branchService.findById(req.params.id),
  });
}

module.exports = { find, findById };
