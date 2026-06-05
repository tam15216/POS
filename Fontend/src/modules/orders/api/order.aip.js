import api from '../../../shared/api/axios'

export const createOrderApi = (data) => {
    return api.post('/orders' , data);
};

export const getOrdersApi = () => {
    return api.get('/orders');
};

export const getOrderByIdApi = (id) => {
    return api.get(`/orders/${id}`);
};

export const getOrderDetailApi = (id) => {
    return api.get(`/orders/detail/${id}`);
};