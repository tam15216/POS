import api from '../../../shared/api/axios';

export const getCategoriesApi = () => {
    return api.get('/categories');
};

export const getCategories_notallApi = () => {
    return api.get('/categories/notall');
};

export const createCategoryApi = (data) => {
    console.log(data);
    return api.post('/categories', data);
};

export const toggleCategoryApi = (id) => {
    return api.patch(`/categories/${id}`);
};
