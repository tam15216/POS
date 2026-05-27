import { getStocksApi, getStockHistoryApi, stockInApi, stockOutApi } from "../api/stock.api";


export const getStocks = async () => {

    const res = await getStocksApi();
    return res.data;
};

export const stockIn = async (data) => {
    const res = await stockInApi(data);
    return res.data;
};

export  const stockOut = async (data) => {
    const res = await stockOutApi(data);
    return res.data;
};

export const getStockHistory = async () => {
    const res = await getStockHistoryApi();
    return res.data;
};