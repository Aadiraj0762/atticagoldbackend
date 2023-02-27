const customerBankService = require("../../services/customer-bank");

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: (await customerBankService.findById(req.params.id))?.bank ?? [],
  });
}

async function create(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await customerBankService.create(req.body),
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
      data: await customerBankService.remove(
        req.body.customerId,
        req.params.id
      ),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

module.exports = { findById, create, remove };
