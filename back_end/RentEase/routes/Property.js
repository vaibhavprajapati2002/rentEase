const express = require("express");
const router = express.Router();
const propertyController = require("../controller/PropertyController.js");
const authMiddleware = require("../middleware/auth.js"); // ensure token sets req.user

router.post("/createProperty", authMiddleware, propertyController.createProperty);
router.get("/getProperty", authMiddleware, propertyController.getMyProperties);
router.get("/getProperty:id", authMiddleware, propertyController.getPropertyById);
router.put("/updateProperty:id", authMiddleware, propertyController.updateProperty);
router.delete("/deleteProperty:id", authMiddleware, propertyController.deleteProperty);

module.exports = router;
