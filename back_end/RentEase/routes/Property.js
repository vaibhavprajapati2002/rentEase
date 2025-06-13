const express = require("express");
const router = express.Router();
const propertyController = require("../controller/PropertyController.js");
const authMiddleware = require("../middleware/auth.js"); 
const upload = require("../middleware/upload.js");

router.post("/createProperty", authMiddleware, upload.single("image"), propertyController.createProperty);
router.get("/getProperty", authMiddleware, propertyController.getMyProperties);
router.get("/getProperty:id", authMiddleware, propertyController.getPropertyById);
router.put("/updateProperty:id", authMiddleware, propertyController.updateProperty);
router.delete("/deleteProperty:id", authMiddleware, propertyController.deleteProperty);
router.get("/allProperty", propertyController.getAllProperties);

module.exports = router;
