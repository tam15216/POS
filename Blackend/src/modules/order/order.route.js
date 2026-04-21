const express = require('express');
const router = express.Router();
const controller =require('./order.controller');

const auth = require('../../middleware/auth');


router.post('/', auth, controller.createOrder);
router.post('/cancel/:id', auth, controller.cancelOrder);

module.exports = router;