const supportService = require("../../services/support");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await supportService.find({ customer: req.user._id }),
  });
}

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: await supportService.findById(req.params.id),
  });
}

async function create(req, res) {
  req.body.customer = req.user._id;
  try {
    res.json({
      status: true,
      message: "",
      data: await supportService.create(req.body),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

async function update(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await supportService.update(req.params.id, req.body),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

async function remove(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await supportService.remove(req.params.id),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

module.exports = { find, findById, create, update, remove };
