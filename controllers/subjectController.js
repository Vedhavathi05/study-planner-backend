// backend/controllers/subjectController.js
const Subject = require("../models/Subject"); // or "../models/subjectModel" if that's your file name

// POST /api/subjects
exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      userId: req.user._id,
      title: req.body.title,
    });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: "Error creating subject" });
  }
};

// GET /api/subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

// DELETE /api/subjects/:id
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject deleted", subject });
  } catch (err) {
    res.status(500).json({ message: "Error deleting subject" });
  }
};
