const UploadProof = require("../models/uploadproof");

async function find(query = {}) {
  try {
    return await UploadProof.find(query).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await UploadProof.findById(id).exec();
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new UploadProof(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await UploadProof.findByIdAndUpdate(id, payload).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await UploadProof.findByIdAndDelete(id).exec();
  } catch (err) {
    throw err;
  }
}

module.exports = { find, findById, create, update, remove };
