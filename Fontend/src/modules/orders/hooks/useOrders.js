import {useEffect, useState} from "react";
import { getOrders } from "../services/order.service";

export default function useOrders(){

    const [orders , setOrders] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        loadOrders();
    },[]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error("Failed to load orders:", err);
        } finally {
            setLoading(false);
        }
    };

    return { orders, loading };
}