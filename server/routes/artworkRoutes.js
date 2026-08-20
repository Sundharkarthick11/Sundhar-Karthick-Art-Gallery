const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createArtwork,
  getArtworks,
  getFeaturedArtworks,
  updateArtwork,
  deleteArtwork,
} = require("../controllers/artworkController");

// Public Routes
router.get("/", getArtworks);
router.get("/featured", getFeaturedArtworks);

// Admin Routes
router.post("/", protect, createArtwork);
router.put("/:id", protect, updateArtwork);
router.delete("/:id", protect, deleteArtwork);

module.exports = router;