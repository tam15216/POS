// option.route.js
const express = require('express');
const router = express.Router();
const controller = require('./option.controller');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/', auth, role('admin'), controller.addOption);
router.get('/ingredients', auth, role('admin'), controller.loadIngredients);
router.get('/active', controller.loadActiveOptions);
router.get('/recipe/:id', auth, role('admin'), controller.loadOptionRecipe)
router.put('/mapping/:id', auth, role('admin'), controller.mapIngredients);
router.put('/:id', auth, role('admin'), controller.editOption);                 
router.put('/status/:id', auth, role('admin'), controller.toggleOptionStatus);   

module.exports = router;