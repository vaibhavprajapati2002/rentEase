// models/RentStatusModel.js
const mongoose = require("mongoose");

const RentStatusSchema = new mongoose.Schema({
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Overdue"],
    default: "Pending",
  },
  paymentDate: {
    type: Date,
  },
  paymentMode: {
    type: String,
    enum: ["UPI", "Cash", "Card", "Bank Transfer", "Other"],
    default: "UPI",
  },
  month: {
    type: String, // Format: "2025-06"
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("RentStatus", RentStatusSchema);
