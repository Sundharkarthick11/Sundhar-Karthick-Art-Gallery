const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSavedArtworks,
  toggleSavedArtwork,
} = require("../controllers/savedArtworkController");

router.get("/", protect, getSavedArtworks);

router.post("/:artworkId", protect, toggleSavedArtwork);

module.exports = router;