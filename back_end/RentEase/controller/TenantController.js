// controllers/tenantController.js   (or wherever you keep it)
const User = require("../models/UserModel");
const Property = require("../models/PropertyModel");
const bcrypt = require("bcrypt");
 

/* ------------------------- 1. Assign property ------------------------ */
exports.assignPropertyToTenant = async (req, res) => {
  try {
    const tenantId   = req.user._id;           // use _id consistently
    const { propertyId } = req.body;

    /* a. property must exist */
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    /* b. caller must be a tenant */
    const tenant = await User.findById(tenantId);
    if (tenant.role !== "tenant")
      return res.status(403).json({ message: "Only tenants can select a property" });

    /* c. link property → tenant */
    tenant.property = propertyId;
    await tenant.save();

    return res.status(200).json({ message: "Property assigned successfully", tenant });
  } catch (err) {
    console.error("assignPropertyToTenant:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* -------------------------- 2. Get owner ----------------------------- */
exports.getOwnerInfo = async (req, res) => {
  try {
    /* a. only tenants */
    if (req.user.role !== "tenant")
      return res.status(403).json({ error: "Only tenants can access this endpoint." });

    /* b. tenant → property → ownerId */
    const tenant = await User.findById(req.user._id)
      .populate({
        path: "property",
        populate: { path: "ownerId", select: "name email phone" },
      })
      .lean();

    if (!tenant)              return res.status(404).json({ error: "Tenant not found." });
    if (!tenant.property)     return res.status(404).json({ error: "No property assigned to this tenant." });
    if (!tenant.property.ownerId)
      return res.status(404).json({ error: "Owner not linked to this property." });

    return res.status(200).json({
      owner:    tenant.property.ownerId,        // populated owner doc
      property: {
        _id:     tenant.property._id,
        name:    tenant.property.name,
        address: tenant.property.address,
        image:   tenant.property.image,
      },
    });
  } catch (err) {
    console.error("getOwnerInfo:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const tenant = await User.findById(req.user._id)
      .populate({
        path: "property",
        select: "name address image",          // include any property fields you need
      })
      .select(                                 // explicitly pick non-sensitive fields
        "name email phone country role " +
        "fatherName permanentAddress gender dob profileImage " +
        "property"
      )                                        // everything else (password, otp…) stays out
      .lean();

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found." });
    }

    /* ---------- Optionally prefix image path ---------- */
    if (tenant.profileImage && !tenant.profileImage.startsWith("http")) {
      tenant.profileImage = `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${tenant.profileImage}`;
    }

    return res.status(200).json(tenant);
  } catch (err) {
    console.error("getProfile:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


/* ------------------------------------------------------------------ */
/*  PUT /tenant/profile                                               */
/* ------------------------------------------------------------------ */




exports.updateProfile = async (req, res) => {
  try {
    const allowed = [
      "name",
      "email",
      "phone",
      "country",
      "password",
      "fatherName",
      "permanentAddress",
      "gender",
      "dob",
    ];

    const updates = {};

    // Collect fields from req.body
    allowed.forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updates[key] = req.body[key];
      }
    });

    // ✅ Handle uploaded profile image
    if (req.file && req.file.filename) {
      updates.profileImage = req.file.filename;
    }

    // ✅ Hash password if needed
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    // ✅ Update and return updated tenant
    const tenant = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!tenant) return res.status(404).json({ error: "Tenant not found." });

    delete tenant.password;
    delete tenant.otp;
    delete tenant.otpExpiresAt;

    return res.status(200).json({ message: "Profile updated", tenant });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `${field} already in use` });
    }

    console.error("updateProfile:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

