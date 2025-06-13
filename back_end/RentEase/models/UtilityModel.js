const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  utilityType: {
    type: String,
    enum: ['Electricity', 'Water', 'Gas', 'Other'],
    required: true
  },
  month: { type: String, required: true }, // e.g. "June 2025"
  usage: { type: Number, required: true },  // e.g. kWh or Liters
  unitCost: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Utility', utilitySchema);
