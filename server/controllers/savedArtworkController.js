const User = require("../models/User");

const toggleSavedArtwork = async (req, res) => {
  try {
    const { userId, artworkId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadySaved =
      user.savedArtworks.includes(artworkId);

    if (alreadySaved) {
      user.savedArtworks =
        user.savedArtworks.filter(
          (id) => id !== artworkId
        );
    } else {
      user.savedArtworks.push(artworkId);
    }

    await user.save();

    res.json({
      success: true,
      savedArtworks: user.savedArtworks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  toggleSavedArtwork,
};