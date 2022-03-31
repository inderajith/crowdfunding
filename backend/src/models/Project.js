const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: String,
  title: String,
  tagline: String,
  amount: String,
  minimumContribution: String,
  raisedAmount: String,
  remainingAmount: String,
  startDate: String,
  endDate: String,
  about: String,
  thumbnail: String,
  imageGallery: String,
  videoLink: String,
  otherLink: String,
  investors: [{ address: String, name: String, amount: String }],
  requests: [
    {
      id: String,
      description: String,
      amount: String,
      recipient: String,
      completed: Boolean,
      approvalCount: String,
      approvals: [
        {
          address: String,
          name: String,
          status: Boolean,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
