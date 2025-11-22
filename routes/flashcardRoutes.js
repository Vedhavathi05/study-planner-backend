
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController");

router.post("/", auth, createFlashcard);

router.get("/:subjectId", auth, getFlashcards);

router.put("/:id", auth, updateFlashcard);

router.delete("/:id", auth, deleteFlashcard);

module.exports = router;
