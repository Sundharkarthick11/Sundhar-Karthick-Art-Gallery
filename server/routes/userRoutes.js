const express = require("express");

const {
  signup,
  login,
  googleLogin,
  toggleSavedArtwork,
  getSavedArtworks,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const userProtect = require(
  "../middleware/userAuthMiddleware"
);

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/google", googleLogin);

router.post(
  "/saved-artworks",
  userProtect,
  toggleSavedArtwork
);
router.put(
  "/change-password",
  userProtect,
  changePassword
);

router.get(
  "/saved-artworks",
  userProtect,
  getSavedArtworks
);
router.post(
  "/forgot-password",
  forgotPassword
);
router.put(
  "/reset-password/:token",
  resetPassword
);

module.exports = router;