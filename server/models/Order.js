const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    artworkType: {
      type: String,
      required: true,
    },

    paperSize: {
      type: String,
      required: true,
    },

    peopleCount: {
      type: Number,
      required: true,
    },

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

    imageUrl: {
      type: String,
    },

    notes: {
      type: String,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Pending Review",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);