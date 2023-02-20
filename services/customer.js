const Customer = require("../models/customer");

async function find(query = {}) {
  try {
    return await Customer.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Customer.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    const latestSeq = await Customer.findOne({})
      .sort({ customerIdSeq: -1 })
      .exec();
    payload.customerIdSeq = (latestSeq.customerIdSeq ?? 0) + 1;
    let customer = new Customer(payload);
    return await customer.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Customer.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Customer.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
