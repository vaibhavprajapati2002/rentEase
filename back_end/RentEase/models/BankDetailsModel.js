// models/BankDetails.js
const mongoose = require("mongoose");

const BankDetailsSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  accountHolderName: String,
  upiId: String,
  upiNumber: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BankDetails", BankDetailsSchema);
