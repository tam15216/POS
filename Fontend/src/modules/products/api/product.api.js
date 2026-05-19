import api from '../../../shared/api/axios';

export const getProductsApi = () => {
    return api.get('/products');
};

export const createProductApi = (data) => {
    return api.post('/products', data);
};

export const updateProductApi = (id, data) => {
    return api.put(`/products/${id}`, data);
};

export const deleteProductApi = (id) => {
    return api.delete(`/products/${id}`);
};

