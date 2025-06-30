// routes/rentalAgreementRoutes.js
const express = require("express");
const router = express.Router();
const rentalAgreementController = require("../controller/RentalAgreementController");
const auth = require("../middleware/auth");
router.get(
  "/template/:propertyId",
  auth, // middleware to verify JWT
  rentalAgreementController.getTemplateByProperty
);
router.post(
  "/template",
  auth, // middleware to verify JWT
  rentalAgreementController.createOrUpdateTemplate
);

module.exports = router;
