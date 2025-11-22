const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
