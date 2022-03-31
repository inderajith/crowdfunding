const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  role: {
    type: String,
    default: "creator",
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  invested: [String],
});

module.exports = mongoose.model("User", userSchema);
