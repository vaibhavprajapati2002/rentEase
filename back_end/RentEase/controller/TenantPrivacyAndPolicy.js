// controllers/tenantPolicyController.js
const Property = require("../models/PropertyModel");
const User = require("../models/UserModel");

exports.getOwnerPoliciesForTenant = async (req, res) => {
  try {
    if (req.user.role !== "tenant") {
      return res.status(403).json({ message: "Only tenants can access this" });
    }

    const propertyId = req.user.property;

    if (!propertyId) {
      return res.status(400).json({ message: "No property assigned to tenant" });
    }

    const property = await Property.findById(propertyId).lean();
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const owner = await User.findById(property.ownerId)
      .select("privacyAndPolicy name email")
      .lean();

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json({
      ownerName: owner.name,
      privacyPolicy: owner.privacyAndPolicy,
    });
  } catch (err) {
    console.error("Error fetching owner policies:", err);
    res.status(500).json({ message: "Server error" });
  }
};
