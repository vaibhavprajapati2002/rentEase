// controllers/rentalAgreementController.js
const User = require("../models/UserModel");

const RentalAgreement = require("../models/RentalAgreement");

exports.createOrUpdateTemplate = async (req, res) => {
  try {
    const { propertyId, template } = req.body;

    const ownerId = req.user._id;

    // Check if a template already exists for this property
    let agreement = await RentalAgreement.findOne({
      property: propertyId,
      owner: ownerId,
      status: "template",
    });

    if (agreement) {
      // Update existing template
      agreement.template = template;
      await agreement.save();
      return res.status(200).json({ message: "Template updated successfully", agreement });
    }

    // Create new template
    agreement = new RentalAgreement({
      property: propertyId,
      owner: ownerId,
      template,
      status: "template",
    });

    await agreement.save();
    res.status(201).json({ message: "Template created successfully", agreement });
  } catch (err) {
    console.error("Error saving template:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTemplateByProperty = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const propertyId = req.params.propertyId;

    const agreement = await RentalAgreement.findOne({
      property: propertyId,
      owner: ownerId,
      status: "template",
    });

    if (!agreement) {
      return res.status(404).json({ message: "No template found" });
    }

    res.json({ template: agreement.template });
  } catch (err) {
    console.error("Error fetching template:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/rentalAgreementController.js
exports.getTemplateForTenant = async (req, res) => {
  try {
    const tenantId = req.user._id;
    const tenant = await User.findById(tenantId);

    if (!tenant.property) {
      return res.status(404).json({ message: "Tenant has no assigned property." });
    }

    const agreement = await RentalAgreement.findOne({
      property: tenant.property,
      status: "template",
    });

    if (!agreement) {
      return res.status(404).json({ message: "No agreement template found for this property." });
    }

    res.status(200).json({ template: agreement.template, propertyId: tenant.property });
  } catch (err) {
    console.error("Error fetching template:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/rentalAgreementController.js
exports.submitAgreementRequest = async (req, res) => {
  try {
    const tenantId = req.user._id;
    const tenant = await User.findById(tenantId);

    if (!tenant.property) {
      return res.status(400).json({ message: "Tenant not assigned to a property." });
    }

    const existingTemplate = await RentalAgreement.findOne({
      property: tenant.property,
      status: "template",
    });

    if (!existingTemplate) {
      return res.status(404).json({ message: "Agreement template not found." });
    }

    const { tenantName, aadharNumber, startDate, durationMonths } = req.body;

    const agreementRequest = new RentalAgreement({
      property: tenant.property,
      owner: existingTemplate.owner,
      tenant: tenantId,
      template: existingTemplate.template,
      filledFields: {
        tenantName,
        aadharNumber,
        startDate,
        durationMonths,
      },
      status: "requested",
    });

    await agreementRequest.save();

    res.status(201).json({ message: "Agreement request submitted for approval." });
  } catch (err) {
    console.error("Error submitting agreement request:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// 1. Get all tenant requests for the current owner
exports.getTenantRequestsForOwner = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const requests = await RentalAgreement.find({
      owner: ownerId,
      status: "requested",
    })
      .populate("tenant", "name email")
      .populate("property", "name");

    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error while fetching requests" });
  }
};

// 2. Respond to a request (approve/reject)
exports.respondToRequest = async (req, res) => {
  try {
    const agreementId = req.params.id;
    const { status } = req.body; // expected: "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const agreement = await RentalAgreement.findById(agreementId);

    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    // 🔄 Updated status check
    if (agreement.status !== "requested") {
      return res.status(400).json({ message: "Agreement is not in 'request' state" });
    }

    agreement.status = status;
    await agreement.save();

    res.json({ message: `Agreement ${status} successfully` });
  } catch (err) {
    console.error("Error updating agreement:", err);
    res.status(500).json({ message: "Server error while updating agreement" });
  }
};

// controllers/RentalAgreementController.js



exports.getApprovedAgreements = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const agreements = await RentalAgreement.find({
      owner: ownerId,
      status: "approved",
    })
      .populate("property", "name city")
      .populate("tenant", "name email phone");

    res.json(agreements);
  } catch (err) {
    console.error("Error fetching approved agreements:", err);
    res.status(500).json({ message: "Server error while fetching approved agreements" });
  }
};



exports.getAllAgreements = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const agreements = await RentalAgreement.find({ owner: ownerId })
      .populate("property", "name city")
      .populate("tenant", "name email");

    res.json(agreements);
  } catch (err) {
    console.error("Error fetching all agreements:", err);
    res.status(500).json({ message: "Server error while fetching agreements" });
  }
};
