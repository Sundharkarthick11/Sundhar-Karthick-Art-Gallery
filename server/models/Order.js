const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ===============================
    // ORDER ID
    // ===============================
    orderId: {
      type: String,
      unique: true,
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

    // ===============================
    // CUSTOMER DETAILS
    // ===============================
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // ===============================
    // ARTWORK DETAILS
    // ===============================
    artworkType: {
      type: String,
      required: true,
      enum: ["Graphite Art", "Charcoal Art", "Pixel Art"],
    },

    paperSize: {
      type: String,
      required: true,
      enum: ["A5", "A4", "A3", "A2"],
    },

    peopleCount: {
      type: Number,
      required: true,
      min: 1,
    },

    // ===============================
    // DELIVERY DETAILS
    // ===============================
    deliveryMethod: {
      type: String,
      required: true,
      enum: ["In-Hand / Pickup", "Post / Courier"],
    },

    deliveryCharge: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    deliveryAddress: {
      type: String,
      default: "",
      trim: true,
    },

    // ===============================
    // PRICE DETAILS
    // ===============================
    estimatedPrice: {
      type: Number,
      required: true,
    },

    advanceAmount: {
      type: Number,
      required: true,
    },

    balanceAmount: {
      type: Number,
      required: true,
    },

    // ===============================
    // CUSTOMER REFERENCE IMAGE
    // ===============================
    imageUrl: {
      type: String,
      default: "",
    },

    // ===============================
    // COMPLETED PORTRAIT
    // ===============================
    completedImageUrl: {
      type: String,
      default: "",
    },

    completedAt: {
      type: Date,
    },

    // ===============================
    // NOTES
    // ===============================
    notes: {
      type: String,
      default: "",
    },

    // ===============================
    // PAYMENT
    // ===============================
    paymentStatus: {
      type: String,
      default: "Pending",
    },

    paymentId: {
      type: String,
      default: "",
    },

    // ===============================
    // ORDER STATUS
    // ===============================
    orderStatus: {
      type: String,
      default: "Order Accepted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);