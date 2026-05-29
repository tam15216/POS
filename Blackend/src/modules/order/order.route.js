const express = require('express');
const router = express.Router();
const controller =require('./order.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role')


router.post('/', auth, controller.createOrder);
router.post('/cancel/:id', auth, role('admin') ,controller.cancelOrder);

module.exports = router;