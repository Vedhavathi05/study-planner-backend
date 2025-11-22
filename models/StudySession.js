const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    startTime: Date,
    endTime: Date,
    durationMinutes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudySession", StudySessionSchema);
