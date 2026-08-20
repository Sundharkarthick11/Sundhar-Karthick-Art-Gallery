const Artwork = require("../models/Artwork");

// ==========================================
// CREATE ARTWORK
// ==========================================
const createArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.create(req.body);

    res.status(201).json({
      success: true,
      artwork,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL ARTWORKS
// ==========================================
const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      artworks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET FEATURED ARTWORKS
// ==========================================
const getFeaturedArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({
      featured: true,
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      artworks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE ARTWORK
// ==========================================
const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      artwork,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE ARTWORK
// ==========================================
const deleteArtwork = async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Artwork deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createArtwork,
  getArtworks,
  getFeaturedArtworks,
  updateArtwork,
  deleteArtwork,
};