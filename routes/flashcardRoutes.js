// backend/routes/flashcardRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController");

// Create flashcard
router.post("/", auth, createFlashcard);

// Get by subject
router.get("/:subjectId", auth, getFlashcards);

// Update flashcard
router.put("/:id", auth, updateFlashcard);

// Delete flashcard
router.delete("/:id", auth, deleteFlashcard);

module.exports = router;
