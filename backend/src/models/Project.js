const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: String,
  title: String,
  tagline: String,
  amount: Number,
  minimumContribution: Number,
  raisedAmount: Number,
  remainingAmount: Number,
  startDate: String,
  endDate: String,
  about: String,
  thumbnail: String,
  imageGallery: String,
  videoLink: String,
  otherLink: String,
  investors: [{ address: String, name: String, amount: Number }],
  requests: [
    {
      id: String,
      description: String,
      amount: Number,
      recipient: String,
      completed: Boolean,
      approvalCount: Number,
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
