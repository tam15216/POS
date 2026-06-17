const express = require('express');
const router = express.Router();
const ingredientController = require('./ingredient.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');

router.post('/', auth, role('admin'), ingredientController.createIngredient);
router.get('/', auth, role('admin'), ingredientController.getIngredients);
router.get('/history', auth, ingredientController.getStockHistory);
router.patch('/:id/stock', auth, role('admin'), ingredientController.updateStockQuantity);
router.put('/:id/restock', auth, role('admin'), ingredientController.restockIngredient);
router.put('/:id', auth, role('admin'), ingredientController.updateIngredient);
router.patch('/:id/toggle', auth, role('admin'), ingredientController.toggleIngredientStatus);

module.exports = router;