const RentStatus = require("../models/RentStatusModel.js");
const Property = require("../models/PropertyModel.js");

// GET: Fetch rent statuses for all tenants by this owner
exports.getOwnerRentStatus = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const filters = { ownerId }; // Direct filter
    if (req.query.month) filters.month = req.query.month;
    if (req.query.propertyId) filters.propertyId = req.query.propertyId;

    const rentStatus = await RentStatus.find(filters)
      .populate("tenantId", "name email phone")
      .populate("propertyId", "name address");

    res.status(200).json(rentStatus);
  } catch (err) {
    console.error("Error fetching rent status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST or PUT: Add or Update rent status entry
exports.addOrUpdateRentStatus = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { tenantId, propertyId, amount, status, paymentDate, paymentMode, month } = req.body;

    const rentRecord = await RentStatus.findOneAndUpdate(
      { tenantId, propertyId, month },
      {
        ownerId, // ensure ownerId is saved
        tenantId,
        propertyId,
        amount,
        status,
        paymentDate,
        paymentMode,
        month,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(rentRecord);
  } catch (err) {
    console.error("Error updating rent status:", err);
    res.status(500).json({ error: "Server error" });
  }
};




exports.getRentStatus = async (req, res) => {
  try {
    // Fetch all rent statuses, with tenant and property details
    const rentStatus = await RentStatus.find()
      .populate("tenantId", "name email phone")
      .populate("propertyId", "name address");

    if (!rentStatus || rentStatus.length === 0) {
      return res.status(404).json({ error: "No rent status records found" });
    }

    res.status(200).json(rentStatus);
  } catch (err) {
    console.error("Error fetching rent status:", err);
    res.status(500).json({ error: "Server error" });
  }
};