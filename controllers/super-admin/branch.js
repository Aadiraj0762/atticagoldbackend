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

async function create(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await branchService.create(req.body),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
      data: {},
    });
  }
}

async function update(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await branchService.update(req.params.id, req.body),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
      data: {},
    });
  }
}

async function remove(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await branchService.remove(req.params.id),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
      data: {},
    });
  }
}

module.exports = { find, findById, create, update, remove };
