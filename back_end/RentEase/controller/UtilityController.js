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
      .populate('property', 'name ownerId')
      .exec();

    // Filter to only return those linked to properties owned by the current owner
    const filtered = utilities.filter(u => u.property?.ownerId?.toString() === ownerId);
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



// ✅ Tenant: Get all utilities for the logged-in tenant
exports.getTenantUtilities = async (req, res) => {
  try {
    const tenantId = req.user.id; // assuming JWT middleware sets req.user
    const utilities = await Utility.find({ tenant: tenantId })
      .populate('property', 'name address ownerId');

    res.json(utilities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tenant utilities', details: err.message });
  }
};

// ✅ Tenant: Pay utility (mark as paid after payment success)
exports.payUtility = async (req, res) => {
  try {
    const { id } = req.params;

    // Find utility and check ownership
    const utility = await Utility.findById(id);
    if (!utility) return res.status(404).json({ message: 'Utility not found' });

    if (utility.tenant.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    utility.isPaid = true;
    await utility.save();

    res.json({ message: 'Utility marked as paid', utility });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status', details: err.message });
  }
};
