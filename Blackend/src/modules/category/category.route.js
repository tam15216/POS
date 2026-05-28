const express = require('express');
const router = express.Router();
const controllre = require('./category.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/', auth , role('admin') , controllre.createCategory)
router.get('/', auth , role('admin') ,controllre.getAllCategories);
router.get('/notall', auth , role('admin') ,controllre.getnotallCategories);
router.patch('/:id', auth , role('admin') , controllre.toggleCategory);
module.exports = router;