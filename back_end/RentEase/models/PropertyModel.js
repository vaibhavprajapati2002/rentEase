const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    /** ──────────────────────────────────────────────
     *  Reference to the owning user
     *  ──────────────────────────────────────────────*/
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",              // ✅ should match your actual model name (it does!)
      required: true,
      index: true,              // ✅ good for lookup performance
    },

    /** Core details */
    name:       { type: String, required: true, trim: true },    // ✅
    address:    { type: String, required: true },                // ✅
    city:       { type: String, required: true },                // ✅
    state:      { type: String, required: true },                // ✅
    pincode:    { type: String, required: true },                // ✅

    /** Property characteristics */
    type: {
      type: String,
      enum: ["Apartment", "House", "Flat", "Villa", "PG", "Other"],
      required: true,
    },                                                           // ✅
    bhk:        { type: Number, required: true },                // ✅
    size:       { type: Number, required: true },                // ✅

    /** Financials */
    rent:       { type: Number, required: true },                // ✅
    deposit:    { type: Number, required: true },                // ✅

    /** Availability & extras */
    availableFrom: { type: Date, required: true },               // ✅
    description:   { type: String },                             // ✅
    image:         { type: String, default: "" },                // ✅

    status: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available",
    },                                                           // ✅
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
