const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    question: String,
    answer: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flashcard", FlashcardSchema);
