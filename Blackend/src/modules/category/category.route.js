const express = require('express');
const router = express.Router();
const controllre = require('./category.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/', auth , role('admin') , controllre.createCategory)

module.exports = router;