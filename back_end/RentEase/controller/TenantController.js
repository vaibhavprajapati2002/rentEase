const User = require("../models/UserModel");
const Property = require("../models/PropertyModel");

exports.assignPropertyToTenant = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware
    const { propertyId } = req.body;

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Only allow tenants to assign property
    const user = await User.findById(userId);
    if (user.role !== "tenant") {
      return res.status(403).json({ message: "Only tenants can select a property" });
    }

    // Assign the property to the tenant
    user.property = propertyId;
    await user.save();

    res.status(200).json({ message: "Property assigned successfully", user });
  } catch (error) {
    console.error("Error assigning property:", error);
    res.status(500).json({ message: "Server error" });
  }
};



