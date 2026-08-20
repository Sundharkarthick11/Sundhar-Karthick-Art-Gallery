const express = require("express");

const router = express.Router();

const {
  toggleSavedArtwork,
} = require("../controllers/savedArtworkController");

router.post("/toggle", toggleSavedArtwork);

module.exports = router;