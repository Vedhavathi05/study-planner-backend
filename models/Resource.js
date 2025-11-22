const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    title: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", ResourceSchema);
