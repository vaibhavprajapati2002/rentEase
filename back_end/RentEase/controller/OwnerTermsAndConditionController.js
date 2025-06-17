const User = require("../models/UserModel");

// @desc    Get owner's current terms and conditions
// @route   GET /api/owner/terms
// @access  Private (Owner only)
exports.getOwnerTerms = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const owner = await User.findById(ownerId).select("termsAndConditions role");
    if (!owner || owner.role !== "owner") {
      return res.status(403).json({ error: "Access denied. Only owners can access this resource." });
    }

    res.status(200).json({ termsAndConditions: owner.termsAndConditions });
  } catch (error) {
    console.error("Error fetching owner's terms:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update owner's terms and conditions
// @route   POST /api/owner/terms
// @access  Private (Owner only)
exports.updateOwnerTerms = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { termsAndConditions } = req.body;

    if (!termsAndConditions) {
      return res.status(400).json({ error: "Terms and conditions content is required." });
    }

    const updatedOwner = await User.findByIdAndUpdate(
      ownerId,
      { termsAndConditions },
      { new: true }
    ).select("termsAndConditions");

    res.status(200).json({
      message: "Terms and conditions updated successfully.",
      updatedTerms: updatedOwner.termsAndConditions
    });
  } catch (error) {
    console.error("Error updating owner's terms:", error);
    res.status(500).json({ error: "Server error" });
  }
};
