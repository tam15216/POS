const ingredientService = require('./ingredient.service');

const createIngredient = async (req, res) => {
    try {
        const result = await ingredientService.createIngredient(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getIngredients = async (req, res) => {
    try {
        const data = await ingredientService.getIngredients();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ingredientService.updateIngredient(id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ingredientService.deleteIngredient(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createIngredient, getIngredients , updateIngredient , deleteIngredient};