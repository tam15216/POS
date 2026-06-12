import { createOptionApi, getIngredientsApi, mapIngredientsApi , getOptionRecipeApi , updateOptionApi , updateOptionStatusApi , getActiveOptionsApi} from '../api/option.api';

export const createOption = async (data) => {
    const res = await createOptionApi(data);
    return res.data;
};

export const getAllIngredients = async () => {
    const res = await getIngredientsApi();
    return res.data;
};


export const updateOption = async (id, data) => {
    const res = await updateOptionApi(id, data);
    return res.data;
};

export const updateOptionStatus = async (id, isActive) => {
    const res = await updateOptionStatusApi(id, { Is_active: isActive });
    return res.data;
};

export const updateOptionMapping = async (optionId, ingredients) => {
    const res = await mapIngredientsApi(optionId, { ingredients });
    return res.data;
};

export const getOptionRecipe = async (id) => {
    const res = await getOptionRecipeApi(id);
    return res.data;
};

export const getActiveOptions = async () => {
    const res = await getActiveOptionsApi();
    return res.data;
};