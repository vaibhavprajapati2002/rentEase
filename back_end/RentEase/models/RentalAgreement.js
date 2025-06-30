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
      default: null, // Only required for tenant requests
    },
    template: {
      type: String,
      required: true, // Owner must save a base template
    },
    filledDetails: {
      aadhar: { type: String },
      startDate: { type: Date },
      durationMonths: { type: Number },
      additionalNotes: { type: String },
    },
    status: {
      type: String,
      enum: ["template", "pending", "approved", "rejected"],
      default: "template",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);

module.exports = mongoose.model("RentalAgreement", RentalAgreementSchema);
