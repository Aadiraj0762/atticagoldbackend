const releaseService = require("../../services/release");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await releaseService.find(),
  });
}

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: await releaseService.findById(req.params.id),
  });
}

async function create(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await releaseService.create(req.body),
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
      data: await releaseService.update(req.params.id, req.body),
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
      data: await releaseService.remove(req.params.id),
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
