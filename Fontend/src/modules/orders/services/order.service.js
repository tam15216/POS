import {createOrderApi , getOrdersApi , getOrderByIdApi , getOrderDetailApi , cancelOrderApi , getOptionsApi} from '../api/order.aip';

export const createOrder = async (data) => {
    const res = await createOrderApi(data);
    return res.data;
};

export const cancelOrder = async (id) => {
    const res = await cancelOrderApi(id);
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

export const getOrderDetail = async (id) => {
    const res = await getOrderDetailApi(id);
    return res.data;
};

export const getOptions = async () => {
    const res = await getOptionsApi();
    return res.data;
};