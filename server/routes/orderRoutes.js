const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  uploadCompletedPortrait,
  deleteOrder,
  trackOrder,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getAllOrders);

// Track Order by Email
router.get("/track/:email", trackOrder);

// Update Order Status
router.put("/:id", updateOrderStatus);

// Upload Completed Portrait
router.put("/:id/upload", uploadCompletedPortrait);

// Delete Order
router.delete("/:id", deleteOrder);

module.exports = router;