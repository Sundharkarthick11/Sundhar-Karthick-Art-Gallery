const User = require("../models/User");
const Artwork = require("../models/Artwork");

const getSavedArtworks = async (req, res) => {
  try {
    const user = await User.findById(
      req.admin.userId
    ).populate("savedArtworks");

    res.json({
      success: true,
      artworks: user.savedArtworks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const toggleSavedArtwork = async (
  req,
  res
) => {
  try {
    const { artworkId } = req.params;

    const user = await User.findById(
      req.admin.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadySaved =
      user.savedArtworks.some(
        (id) =>
          id.toString() === artworkId
      );

    if (alreadySaved) {
      user.savedArtworks =
        user.savedArtworks.filter(
          (id) =>
            id.toString() !== artworkId
        );
    } else {
      user.savedArtworks.push(
        artworkId
      );
    }

    // Remove duplicates
    user.savedArtworks = [
      ...new Set(
        user.savedArtworks.map((id) =>
          id.toString()
        )
      ),
    ];

    await user.save();

    await user.populate(
      "savedArtworks"
    );

    res.json({
      success: true,
      artworks: user.savedArtworks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getSavedArtworks,
  toggleSavedArtwork,
};