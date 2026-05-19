import api from '../../../shared/api/axios';

export const getCategoriesApi = () => {
    return api.get('/categories');
};