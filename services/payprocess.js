const Payprocess = require("../models/payprocess");

async function find(query = {}) {
  try {
    return await Payprocess.find(query)
      .populate("employee")
      .sort({ createdAt: -1 })
      .exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Payprocess.findById(id).populate("employee").exec();
  } catch (err) {
    throw err;
  }
}

async function findOne(query) {
  try {
    return await Payprocess.findOne(query).populate("employee").exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let otp = new Payprocess(payload);
    return await otp.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Payprocess.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Payprocess.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  find,
  findById,
  findOne,
  create,
  update,
  remove,
};
