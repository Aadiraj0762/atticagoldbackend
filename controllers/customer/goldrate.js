const goldRateService = require("../../services/goldrate");

async function findOne(req, res) {
  try {
    res.json({
      status: true,
      message: "",
      data: await goldRateService.findOne(req.body),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

module.exports = { findOne };
