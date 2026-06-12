import api from '../../../shared/api/axios'; 

export const createOptionApi = (data) => {
    return api.post('/options', data);
};

export const getIngredientsApi = () => {
    return api.get('/options/ingredients');
};


export const updateOptionApi = (id, data) => {
    return api.put(`/options/${id}`, data);
};

export const updateOptionStatusApi = (id, data) => {
    return api.put(`/options/status/${id}`, data);
};

export const mapIngredientsApi = (id, data) => {
    return api.put(`/options/mapping/${id}`, data);
};

export const getOptionRecipeApi = (id) => {
    return api.get(`/options/recipe/${id}`);
};

export const getActiveOptionsApi = () => {
    return api.get('/options/active');
};