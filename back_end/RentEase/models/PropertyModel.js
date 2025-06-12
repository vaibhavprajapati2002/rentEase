const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Apartment", "House", "Flat", "Villa", "PG", "Other"],
      required: true,
    },
    bhk: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    size: {
      type: Number, // in sq ft
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // store image filename or URL
      default: "",
    },
    status: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
