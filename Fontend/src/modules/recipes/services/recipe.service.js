import { saveRecipeApi , getRecipeApi } from '../api/recipe.api';

export const saveRecipe = async (data) => {
    const res = await saveRecipeApi(data);
    return res.data;
};

export const getRecipe = async (productId) => {
    const res = await getRecipeApi(productId);
    return res.data;
};