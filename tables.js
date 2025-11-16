const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    studyStreak: { type: Number, default: 0 },
    lastStudyDate: Date,
    studyGroups: [String],
  },
  { timestamps: true }
);

const SubjectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
  },
  { timestamps: true }
);

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

const FlashcardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    question: String,
    answer: String,
  },
  { timestamps: true }
);

const ResourceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    title: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
  Subject: mongoose.model("Subject", SubjectSchema),
  StudySession: mongoose.model("StudySession", StudySessionSchema),
  Flashcard: mongoose.model("Flashcard", FlashcardSchema),
  Resource: mongoose.model("Resource", ResourceSchema),
};
