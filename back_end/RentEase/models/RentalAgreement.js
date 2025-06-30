// models/RentalAgreement.js
const mongoose = require("mongoose");

const RentalAgreementSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    template: {
      type: String,
      required: true,
    },
    filledFields: {
      tenantName: String,
      aadharNumber: String,
      startDate: Date,
      durationMonths: Number,
    },
    status: {
      type: String,
      enum: ["template", "requested", "approved", "rejected"],
      default: "template",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentalAgreement", RentalAgreementSchema);
