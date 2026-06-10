const express = require('express');
const router = express.Router();

const productController = require('./product.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');

router.get('/notall', auth, productController.getnotallProducts);
router.get('/', auth, productController.getProducts);
router.post('/', auth, role('admin' , 'stock'), productController.createProduct);
router.get('/type', auth, productController.getProductsByType);
router.get('/:id', auth, productController.getProductById);
router.patch('/:id', auth, role('admin' , 'stock'), productController.toggleProduct);
router.put('/:id', auth, role('admin' , 'stock'), productController.updateProduct);


module.exports = router;