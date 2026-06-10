const express = require('express');
const router = express.Router();
const recipeController = require('./recipe.controller');
const role = require('../../middleware/role');
const auth = require('../../middleware/auth');

router.post('/', auth, role('admin'), recipeController.saveRecipe);
router.get('/:product_id', auth, recipeController.getRecipe);

module.exports = router;