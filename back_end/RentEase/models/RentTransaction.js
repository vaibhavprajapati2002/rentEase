// models/RentTransaction.js
const mongoose = require("mongoose");

const RentTransactionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    razorpay_payment_id: String,   // returned by Razorpay on success
    razorpay_order_id: String,     // returned when you create the order
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
      index: true,                 // fast look‑ups by status
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }             // adds createdAt & updatedAt
);

module.exports = mongoose.model("RentTransaction", RentTransactionSchema);
