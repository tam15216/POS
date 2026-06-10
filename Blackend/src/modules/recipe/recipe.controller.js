const recipeService = require('./recipe.service');

const saveRecipe = async (req, res) => {
    try {
        const result = await recipeService.saveRecipe(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getRecipe = async (req, res) => {
    try {
        const data = await recipeService.getRecipe(req.params.product_id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { saveRecipe , getRecipe};