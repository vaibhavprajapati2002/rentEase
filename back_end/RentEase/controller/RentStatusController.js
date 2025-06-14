// controllers/rentStatusController.js
const RentStatus = require("../models/RentStatusModel.js");


console.log("RentStatus model methods:", Object.keys(RentStatus));

const Property = require("../models/PropertyModel");

exports.getOwnerRentStatus = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const filters = { };
    if (req.query.month) filters.month = req.query.month;
    if (req.query.propertyId) filters.propertyId = req.query.propertyId;

    // Get properties owned by this user
    const ownerProperties = await Property.find({ ownerId }).select("_id");

    filters.propertyId = { $in: ownerProperties.map(p => p._id) };

    const rentStatus = await RentStatus.find(filters)
      .populate("tenantId", "name email phone")
      .populate("propertyId", "name address");

    res.status(200).json(rentStatus);
  } catch (err) {
    console.error("Error fetching rent status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addOrUpdateRentStatus = async (req, res) => {
  try {
    const { tenantId, propertyId, amount, status, paymentDate, paymentMode, month } = req.body;

    const rentRecord = await RentStatus.findOneAndUpdate(
      { tenantId, propertyId, month },
      { amount, status, paymentDate, paymentMode },
      { upsert: true, new: true }
    );

    res.status(200).json(rentRecord);
  } catch (err) {
    console.error("Error updating rent status:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// exports.getTenantRentStatus = async (req, res) => {
//   try {
//     const tenantId = req.user.id;

//     const filters = { tenantId };
//     if (req.query.month) filters.month = req.query.month;
//     if (req.query.propertyId) filters.propertyId = req.query.propertyId;

//     const rentStatus = await RentStatus.find(filters)
//       .populate("tenantId", "name email phone")
//       .populate("propertyId", "name address");

//     res.status(200).json(rentStatus);
//   } catch (err) {
//     console.error("Error fetching tenant rent status:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };