const customerAddressService = require("../../services/customer-address");

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: (await customerAddressService.findById(req.params.id))?.address ?? [],
  });
}

async function create(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await customerAddressService.create(req.body),
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
      data: await customerAddressService.remove(
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
