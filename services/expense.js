const Expense = require("../models/expense");

async function find(query = {}) {
  try {
    return await Expense.find(query).populate("branch").exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Expense.findById(id).populate("branch").exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Expense(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Expense.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Expense.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
