const adminProtect = require("../middleware/adminMiddleware");
const express = require("express");

const router = express.Router();

const {
  deleteImage,
} = require("../controllers/cloudinaryController");

router.post(
  "/delete",
  adminProtect,
  deleteImage
);

module.exports = router;