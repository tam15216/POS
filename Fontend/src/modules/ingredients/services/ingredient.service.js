import { getIngredientsApi, createIngredientApi , updateIngredientApi , deleteIngredientApi , getStockHistoryApi , updateStockQuantityApi} from '../api/ingredient.api';

export const getIngredients = async () => {
    const res = await getIngredientsApi();
    return res.data;
};

export const createIngredient = async (data) => {
    const res = await createIngredientApi(data);
    return res.data;
};

export const updateIngredient = async (id, data) => {
    const res = await updateIngredientApi(id, data);
    return res.data;
};

export const deleteIngredient = async (id) => {
    const res = await deleteIngredientApi(id);
    return res.data;
};

export const getStockHistory = async () => {
    const res = await getStockHistoryApi();
    return res.data;
};

export const updateStockQuantity = async (id, data) => {
    const res = await updateStockQuantityApi(id, data);
    return res.data;
};