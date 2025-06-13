const express = require('express');
const router = express.Router();
const utilityController = require('../controller/UtilityController');
const verifyToken = require('../middleware/auth.js'); // your auth middleware

router.post('/create-utility', verifyToken, utilityController.createUtility);
router.get('/get-utility', verifyToken, utilityController.getAllUtilities);
router.put('/update-utility:id', verifyToken, utilityController.updateUtility);
router.delete('/delete-utility:id', verifyToken, utilityController.deleteUtility);

module.exports = router;
