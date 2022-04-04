const mongoose = require("mongoose");

const contractProjectSchema = new mongoose.Schema({
  owner: String,
  contractAddress: String,
  minimumAmount: Number,
  projectId: String,
});

module.exports = mongoose.model("ContractProject", contractProjectSchema);
