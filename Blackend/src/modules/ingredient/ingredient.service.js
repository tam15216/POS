const ingredientRepo = require('./ingredient.repo');

const createIngredient = async (data) => {
    const { Ingredient_name, Stock_qty, Unit, Minimum_qty } = data;
    
    if (!Ingredient_name || !Unit) {
        throw new Error('Missing required fields: Ingredient_name or Unit');
    }

    return await ingredientRepo.insertIngredient({
        Ingredient_name,
        Stock_qty: Stock_qty || 0,
        Unit,
        Minimum_qty: Minimum_qty || 0
    });
};

const getIngredients = async () => {
    return await ingredientRepo.getAllIngredients();
};


const updateIngredient = async (id, data) => {
    const { Ingredient_name, Stock_qty, Unit, Minimum_qty } = data;

    if (!id) {
        throw new Error('Ingredient ID is required');
    }
    if (!Ingredient_name || !Unit) {
        throw new Error('Missing required fields: Ingredient_name or Unit');
    }

    return await ingredientRepo.updateIngredient(id, {
        Ingredient_name,
        Stock_qty: Stock_qty || 0,
        Unit,
        Minimum_qty: Minimum_qty || 0
    });
};

const deleteIngredient = async (id) => {
    if (!id) {
        throw new Error('Ingredient ID is required');
    }
    return await ingredientRepo.deleteIngredient(id);
};

module.exports = { createIngredient, getIngredients , updateIngredient , deleteIngredient};