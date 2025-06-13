const User = require("../models/UserModel");
const Property = require("../models/PropertyModel");

exports.getOwnerTenants = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Find all properties owned by the current owner
    const properties = await Property.find({ owner: ownerId }).select("_id");

    const propertyIds = properties.map((p) => p._id);

    // Find tenants whose property is in that list
    const tenants = await User.find({
      role: "tenant",
      property: { $in: propertyIds },
    })
      .populate("property", "name") // populate property name only
      .select("name phone email property");

    res.json(tenants);
  } catch (err) {
    console.error("Error fetching tenants:", err);
    res.status(500).json({ message: "Server error while fetching tenants" });
  }
};


exports.unassignTenant = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { property: null },
      { new: true }
    );

    if (!user || user.role !== "tenant") {
      return res.status(404).json({ message: "Tenant not found or not a tenant" });
    }

    res.status(200).json({ message: "Tenant unassigned successfully", user });
  } catch (error) {
    console.error("Error unassigning tenant", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};