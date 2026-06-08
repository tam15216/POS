// src/routes/report.route.js
const express = require('express');
const router = express.Router();
const reportController = require('../report/report.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');

router.get('/dashboard', auth, role('admin'), reportController.getDashboard);
router.get('/sales', auth, role('admin'), reportController.getSalesReport);
router.get('/top-products', auth, role('admin'), reportController.getTopProductsReport);
router.get('/stock-movement', auth, role('admin'), reportController.getStockMovementReport);

module.exports = router;