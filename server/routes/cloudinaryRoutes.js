const adminProtect = require("../middleware/adminMiddleware");
const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const {
  deleteImage,
  uploadImage,
} = require("../controllers/cloudinaryController");

router.post(
  "/upload",
  adminProtect,
  upload.single("image"),
  uploadImage
);

router.post(
  "/delete",
  adminProtect,
  deleteImage
);

module.exports = router;