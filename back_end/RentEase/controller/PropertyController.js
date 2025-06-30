const Property = require("../models/PropertyModel");
const User = require("../models/UserModel");

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      pincode,
      type,
      bhk,
      rent,
      deposit,
      size,
      availableFrom,
      description,
    } = req.body;

    const image = req.file ? req.file.filename : "";

    const property = new Property({
      ownerId: req.user._id,
      name,
      address,
      city,
      state,
      pincode,
      type,
      bhk,
      rent,
      deposit,
      size,
      availableFrom,
      description,
      image,
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all properties for logged-in owner
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update property by ID
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    Object.assign(property, req.body);
    const updated = await property.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete property by ID
exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single property by ID (optional)
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports .getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching all properties:", error);
    res.status(500).json({ message: "Server error" });
  }
}
exports.getTenantProperty = async (req, res) => {
  try {
    const tenantId = req.user.id;

    // Step 1: Find the tenant
    const tenant = await User.findById(tenantId);
    if (!tenant || tenant.role !== "tenant") {
      return res.status(404).json({ error: "Tenant not found or unauthorized" });
    }

    // Step 2: Fetch property by ID from tenant property field
    const property = await Property.findById(tenant.property);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching tenant property:", error);
    res.status(500).json({ error: "Server error" });
  }
};