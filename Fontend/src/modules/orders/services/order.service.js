import {createOrderApi , getOrdersApi , getOrderByIdApi} from '../api/order.aip';

export const createOrder = async (data) => {
    const res = await createOrderApi(data);
    return res.data;
};

export const getOrders = async () => {
    const res = await getOrdersApi();
    return res.data;
};


export const getOrderById = async (id) => {
    const res = await getOrderByIdApi(id);
    return res.data;
};