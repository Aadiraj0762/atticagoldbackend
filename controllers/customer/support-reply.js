const supportReplyService = require("../../services/support-reply");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await supportReplyService.find(),
  });
}

async function findBySupportId(req, res) {
  res.json({
    status: true,
    message: "",
    data: await supportReplyService.find({ support: req.params.id }),
  });
}

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: await supportReplyService.findById(req.params.id),
  });
}

async function create(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await supportReplyService.create(req.body),
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
      data: await supportReplyService.update(req.params.id, req.body),
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
      data: await supportReplyService.remove(req.params.id),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

module.exports = { find, findById, findBySupportId, create, update, remove };
