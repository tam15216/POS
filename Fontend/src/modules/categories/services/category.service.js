import{
    getCategoriesApi,
    createCategoryApi,
    toggleCategoryApi,
    getCategories_notallApi
} from '../api/category.api';

export const getCategories =  async () => {
    const res = await getCategoriesApi();
    return res.data;
};

export const getCategories_notall =  async () => {
    const res = await getCategories_notallApi();
    return res.data;
};

export const createCategory = async (data) => {
    const res = await createCategoryApi(data);
    return res.data;
};

export const toggleCategory = async (id) => {
    const res = await toggleCategoryApi(id);
    return res.data;
};
