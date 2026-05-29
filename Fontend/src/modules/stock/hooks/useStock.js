import {useEffect, useState} from 'react';

import { getStocks , stockIn, stockOut, getStockHistory } from '../services/stock.service';

export default function useStock() {
    const [stocks, setStocks] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStocks();
        loadHistory();
    }, []);

    const loadStocks = async () => {

        try {
            setLoading(true);
            const data = await getStocks();
            setStocks(data);
            return data;
        } catch (err) {
            console.error(err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            const data = await getStockHistory();
            setHistory(data);
        }catch (err) {
            console.error(err);
        }
    };

    const addStock = async (data) => {
        try {
            await stockIn(data);
            await loadStocks();
            await loadHistory();
        } catch (err) {
            console.error(err);
        }
    };

    const removeStock = async (data) => {
        try {
            await stockOut(data);
            await loadStocks();
            await loadHistory();
        } catch (err) {
            console.error(err);
        }
    };

    return { stocks, history, loading, addStock, removeStock , loadStocks };


};