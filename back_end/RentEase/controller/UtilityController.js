const Utility = require('../models/UtilityModel');

// Add a new utility bill
exports.createUtility = async (req, res) => {
  try {
    const utility = new Utility(req.body);
    await utility.save();
    res.status(201).json({ message: 'Utility created', utility });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create utility', details: err.message });
  }
};

// Get all utilities for owner's properties
exports.getAllUtilities = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const utilities = await Utility.find()
      .populate('tenant', 'name email phone')
      .populate('property', 'name owner')
      .exec();

    // Filter to only return those linked to properties owned by the current owner
    const filtered = utilities.filter(u => u.property?.owner?.toString() === ownerId);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch utilities', details: err.message });
  }
};

// Update a utility
exports.updateUtility = async (req, res) => {
  try {
    const updated = await Utility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update utility', details: err.message });
  }
};

// Delete a utility
exports.deleteUtility = async (req, res) => {
  try {
    await Utility.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utility deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete utility', details: err.message });
  }
};
