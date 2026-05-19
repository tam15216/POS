import { useEffect , useState } from "react";

import {
    getProducts,
    createProduct,
    deleteProduct,
} from '../services/product.service';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);  
        }catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            await createProduct(productData);
            loadProducts();
        }catch (err) {
            console.error(err);
        }
    };

    const removeProduct = async (id) => {
        try {
            await deleteProduct(id);
            loadProducts();
        }catch (err) {
            console.error(err);
        }
    };
    return {
        products,
        loading,
        addProduct,
        removeProduct
    };
}