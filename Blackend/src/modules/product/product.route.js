const express = require('express');
const router = express.Router();

const productController = require('./product.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');


router.get('/:id', auth, productController.getProductById);
router.patch('/:id', auth, role('admin'), productController.toggleProduct);
router.get('/', auth, productController.getProducts);
router.post('/', auth, role('admin'), productController.createProduct);
router.put('/:id', auth, role('admin'), productController.updateProduct);

module.exports = router;