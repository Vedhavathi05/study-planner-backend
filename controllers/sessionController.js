
const StudySession = require("../models/StudySession");

exports.createSession = async (req, res) => {
  try {
    const session = await StudySession.create({
      userId: req.user._id,
      subjectId: req.body.subjectId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      durationMinutes: req.body.durationMinutes,
    });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Error creating session" });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.user._id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sessions" });
  }
};
