// src/routes/report.route.js
const express = require('express');
const router = express.Router();
const reportController = require('../report/report.controller');

router.get('/dashboard', reportController.getDashboard);

module.exports = router;