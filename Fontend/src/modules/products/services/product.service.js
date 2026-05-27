import { data } from 'react-router-dom';
import {
    getProductsApi,
    createProductApi,
    updateProductApi,
    toggleProductApi,
} from '../api/product.api';

export const getProducts =  async () => {
    const res = await getProductsApi();
    return res.data;
};

export const createProduct = async (data) => {
    const res = await createProductApi(data);
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await updateProductApi(id, data);
    return res.data;
};

export const toggleProduct = async (id) => {
    const res = await toggleProductApi(id);
    return res.data;
};