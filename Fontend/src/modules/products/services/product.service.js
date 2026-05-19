import { data } from 'react-router-dom';
import {
    getProductsApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
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

export const deleteProduct = async (id) => {
    const res = await deleteProductApi(id);
    return res.data;
};