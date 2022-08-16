const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.get);
// router.get('/today', dashboardController.getToday);

module.exports = router;