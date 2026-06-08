// src/routes/report.route.js
const express = require('express');
const router = express.Router();
const reportController = require('../report/report.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');

router.get('/dashboard', auth, role('admin'), reportController.getDashboard);

module.exports = router;