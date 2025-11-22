
const Subject = require("../models/Subject"); 

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

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

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
