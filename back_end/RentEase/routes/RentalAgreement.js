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
router.get("/tenant/view-template", auth, rentalAgreementController.getTemplateForTenant);
router.post("/tenant/request-agreement", auth, rentalAgreementController.submitAgreementRequest);


// GET all submitted requests for this owner
router.get("/requests", auth, rentalAgreementController.getTenantRequestsForOwner);

// PUT respond to a request (approve/reject)
router.put("/respond/:id", auth, rentalAgreementController.respondToRequest);

router.get("/approved", auth, rentalAgreementController.getApprovedAgreements);

router.get("/all/agreements", auth, rentalAgreementController.getAllAgreements);

module.exports = router;
