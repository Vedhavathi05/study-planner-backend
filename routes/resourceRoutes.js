
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createResource,
  getResources,
  deleteResource,
} = require("../controllers/resourceController");

router.post("/", auth, createResource);
router.get("/:subjectId", auth, getResources);
router.delete("/:id", auth, deleteResource);

module.exports = router;
