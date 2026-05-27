const express = require('express');
const route = express.Router();
const controller = require('./stock.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


route.get('/',auth,controller.getStocks);
route.get('/history', auth , controller.getStockHistory);
route.post('/in', auth , role('admin') , controller.stockIn);
route.post('/out', auth , role('admin') , controller.stockOut);

module.exports = route;