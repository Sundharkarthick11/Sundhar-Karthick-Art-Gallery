const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getDashboardStats,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);
const adminProtect = require(
  "../middleware/adminMiddleware"
);

router.get(
  "/stats",
  adminProtect,
  getDashboardStats
);

module.exports = router;