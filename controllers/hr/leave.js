const fs = require("fs");
const leaveService = require("../../services/leave");

async function find(req, res) {
  res.json({
    status: true,
    message: "",
    data: await leaveService.find(),
  });
}

async function findById(req, res) {
  res.json({
    status: true,
    message: "",
    data: await leaveService.findById(req.params.id),
  });
}

async function update(req, res) {
  try {
    if (req.file) {
      req.body.proof = `images/leave/${req.file.originalname}`;
      fs.writeFileSync(`./public/${req.body.proof}`, req.file.buffer);
      let oldFile = await leaveService.findById(req.params.id);
      if (oldFile.proof) {
        fs.unlink(`./public/${oldFile.proof}`, function (err) {
          // File not deleted
        });
      }
    }

    res.json({
      status: true,
      message: "",
      data: await leaveService.update(req.params.id, req.body),
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
    let oldFile = await leaveService.findById(req.params.id);
    if (oldFile.proof) {
      fs.unlink(`./public/${oldFile.proof}`, function (err) {
        // File not deleted
      });
    }

    res.json({
      status: true,
      message: "",
      data: await leaveService.remove(req.params.id),
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.errors ?? err.message,
      data: {},
    });
  }
}

module.exports = { find, findById, update, remove };
