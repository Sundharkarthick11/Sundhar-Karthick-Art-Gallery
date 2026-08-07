const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
  trackOrderById,
  uploadCompletedPortrait,
  deleteOrder,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getAllOrders);

// Track Order by Order ID
router.get("/track/order/:orderId", trackOrderById);

// Track Orders by Email
router.get("/track/:email", trackOrder);

// Update Order Status
router.put("/:id", protect, updateOrderStatus);

router.put("/:id/upload", protect, uploadCompletedPortrait);

router.delete("/:id", protect, deleteOrder);

module.exports = router;