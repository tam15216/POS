import { getIngredientsApi, createIngredientApi , updateIngredientApi , toggleIngredientStatusApi , getStockHistoryApi , updateStockQuantityApi , restockIngredientApi} from '../api/ingredient.api';

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

export const toggleIngredientStatus = async (id, data) => {
    const res = await toggleIngredientStatusApi(id, data);
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

export const restockIngredient = async (id, data) => {
    const res = await restockIngredientApi(id, data);
    return res.data;
};