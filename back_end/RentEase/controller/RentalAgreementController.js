// controllers/rentalAgreementController.js

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
