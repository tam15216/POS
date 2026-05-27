import api from '../../../shared/api/axios';


export const getStocksApi = () => {
    return api.get('/stock');
};

export const stockInApi = (data) => {
    return api.post('/stock/in', data);
};

export const stockOutApi = (data) => {
    return api.post('/stock/out', data);
};

export const getStockHistoryApi = () => {
    return api.get('/stock/history');
};