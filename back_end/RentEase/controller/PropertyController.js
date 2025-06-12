const Property = require("../models/PropertyModel");

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
      image,
    } = req.body;

    const property = new Property({
      owner: req.user._id, // req.user should be set from auth middleware
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
    const properties = await Property.find({ owner: req.user._id });
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
      owner: req.user._id,
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
      owner: req.user._id,
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
