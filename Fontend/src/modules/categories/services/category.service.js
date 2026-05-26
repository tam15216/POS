import{
    getCategoriesApi,
    createCategoryApi,
    deleteCategoryApi
} from '../api/category.api';

export const getCategories =  async () => {
    const res = await getCategoriesApi();
    return res.data;
};

export const createCategory = async (data) => {
    const res = await createCategoryApi(data);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await deleteCategoryApi(id);
    return res.data;
};
