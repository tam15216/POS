import api from '../../../shared/api/axios';

export const saveRecipeApi = (data) => api.post('/recipes', data);
export const getRecipeApi = (productId) => api.get(`/recipes/${productId}`);