
const Flashcard = require("../models/Flashcard"); 

// CREATE flashcard  -> POST /api/flashcards
exports.createFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.create({
      userId: req.user._id,
      subjectId: req.body.subjectId,
      question: req.body.question,
      answer: req.body.answer,
    });

    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: "Error creating flashcard" });
  }
};

// GET flashcards by subject -> GET /api/flashcards/:subjectId
exports.getFlashcards = async (req, res) => {
  try {
    const cards = await Flashcard.find({
      userId: req.user._id,
      subjectId: req.params.subjectId,
    }).sort({ createdAt: -1 });

    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching flashcards" });
  }
};

// UPDATE flashcard -> PUT /api/flashcards/:id
exports.updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updated = await Flashcard.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { question, answer },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating flashcard" });
  }
};

// DELETE flashcard -> DELETE /api/flashcards/:id
exports.deleteFlashcard = async (req, res) => {
  try {
    const card = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!card) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json({ message: "Flashcard deleted", card });
  } catch (err) {
    res.status(500).json({ message: "Error deleting flashcard" });
  }
};
