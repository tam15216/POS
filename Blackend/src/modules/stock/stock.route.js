const express = require('express');
const route = express.Router();
const controller = require('./stock.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

route.post('/', auth , role('admin') , controller.addStock);

module.exports = route;