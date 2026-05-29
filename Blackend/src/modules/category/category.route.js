const express = require('express');
const router = express.Router();
const controllre = require('./category.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/', auth , role('admin') , controllre.createCategory)
router.get('/', auth , controllre.getAllCategories);
router.get('/notall', auth , controllre.getnotallCategories);
router.patch('/:id', auth , role('admin') , controllre.toggleCategory);
module.exports = router;