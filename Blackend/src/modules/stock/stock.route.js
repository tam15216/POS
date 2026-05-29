const express = require('express');
const route = express.Router();
const controller = require('./stock.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


route.get('/',auth,controller.getStocks);
route.get('/history', auth ,role('stock' , 'admin') , controller.getStockHistory);
route.post('/in', auth , role('admin' , 'stock') , controller.stockIn);
route.post('/out', auth , role('admin' , 'stock') , controller.stockOut);

module.exports = route;