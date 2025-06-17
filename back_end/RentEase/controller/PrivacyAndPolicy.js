const User = require("../models/UserModel");

// @desc    Get owner's current terms and conditions
// @route   GET /api/owner/terms
// @access  Private (Owner only)

exports.getOwnerPrivacy = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const owner = await User.findById(ownerId).select("privacyAndPolicy role");
    
    if (!owner || owner.role !== "owner") {
      return res.status(403).json({ error: "Access denied. Only owners can access this resource." });
    }

    console.log("Fetched privacy:", owner.privacyAndPolicy); // ✅ moved here

    res.status(200).json({ privacyAndPolicy: owner.privacyAndPolicy });
  } catch (error) {
    console.error("Error fetching owner's privacy:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// @desc    Update owner's terms and conditions
// @route   POST /api/owner/terms
// @access  Private (Owner only)
exports.updateOwnerPrivacy = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { privacyAndPolicy } = req.body;

    if (!privacyAndPolicy) {
      return res.status(400).json({ error: "privacyAndPolicy content is required." });
    }

    const updatedOwner = await User.findByIdAndUpdate(
      ownerId,
      { privacyAndPolicy },
      { new: true }
    ).select("privacyAndPolicy");

    res.status(200).json({
      message: "Privacy and policy  updated successfully.",
      updatedPrivacy: updatedOwner.privacyAndPolicy
    });
  } catch (error) {
    console.error("Error updating owner's privacy:", error);
    res.status(500).json({ error: "Server error" });
  }
};
