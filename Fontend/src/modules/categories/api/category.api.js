import api from '../../../shared/api/axios';

export const getCategoriesApi = () => {
    return api.get('/categories');
};

export const createCategoryApi = (data) => {
    console.log(data);
    return api.post('/categories', data);
};

export const deleteCategoryApi = (id) => {
    return api.delete(`/categories/${id}`);
};
