const express = require('express');
const router = express.Router();
const controllre = require('./category.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/', auth , role('admin') , controllre.createCategory)
router.get('/', auth , role('admin') ,controllre.getAllCategories);
router.delete('/:id', auth , role('admin') , controllre.deleteCategory);
module.exports = router;