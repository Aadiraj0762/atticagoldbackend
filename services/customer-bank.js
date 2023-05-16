const Customer = require("../models/customer");

async function findById(id) {
  try {
    return await Customer.findById(id, { bank: 1, _id: 0 }).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    return await Customer.findByIdAndUpdate(
      payload.customerId,
      { $push: { bank: payload } },
      {
        returnDocument: "after",
      }
    ).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(customer, id) {
  try {
    return await Customer.findByIdAndUpdate(
      customer,
      { $pull: { bank: { _id: id } } },
      {
        returnDocument: "after",
      }
    ).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { findById, create, remove };
