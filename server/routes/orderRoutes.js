const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
  trackOrderById,
  uploadCompletedPortrait,
  deleteOrder,
  getMyOrders,
} = require("../controllers/orderController");

// Create Order
router.post("/", protect, createOrder);

// Get All Orders

router.get("/", adminProtect, getAllOrders);

router.put("/:id", adminProtect, updateOrderStatus);

router.put("/:id/upload", adminProtect, uploadCompletedPortrait);

router.delete("/:id", adminProtect, deleteOrder);


// Track Order by Order ID
router.get("/track/order/:orderId", trackOrderById);
router.get("/my-orders", protect, getMyOrders);

// Track Orders by Email
router.get("/track/:email", trackOrder);
router.post("/track", trackOrder);

// Update Order Status






module.exports = router;