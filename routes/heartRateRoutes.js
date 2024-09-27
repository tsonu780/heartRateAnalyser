const express = require('express');
const router = express.Router();
const heartRateController = require('../controllers/heartRateController');

router.post('/process-data', heartRateController.processHeartRateData);

module.exports = router;
