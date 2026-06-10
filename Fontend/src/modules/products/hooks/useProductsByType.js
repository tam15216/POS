import { useState, useEffect } from 'react';
import { getProductsByType } from '../services/product.service';

export default function useProductsByType(type) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProductsByType(type);
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type) loadProducts();
    }, [type]);

    return { products, loading, refresh: loadProducts };
}