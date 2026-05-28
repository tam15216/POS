import { useEffect , useState } from "react";

import {
    getProducts,
    createProduct,
    toggleProduct,
    updateProduct,
    getProductsnotall
} from '../services/product.service';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [productsnotall, setProductsnotall] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search , setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        loadProducts();
        loadProductsnotall();
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

    const loadProductsnotall = async () => {
        try {
            setLoading(true);
            const data = await getProductsnotall();
            setProductsnotall(data);  
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

    const toggleProducts = async (id) => {
        try {
            await toggleProduct(id);
            loadProducts();
        }catch (err) {
            console.error(err);
        }
    };

    const editProduct = async (id, data) => {
        try {
            await updateProduct(id, data);
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = products.filter((item) => {
        return (item.Product_name || '').toLowerCase().includes(search.toLowerCase());
    });

    const displayProducts = filteredProducts.filter((item) => {
        if (!selectedCategory) return true;
        return item.Category_id === Number(selectedCategory);
    });

    return {
        products,
        productsnotall,
        loading,
        addProduct,
        toggleProducts,
        editProduct,
        search,
        setSearch,
        filteredProducts,
        displayProducts,
        selectedCategory,
        setSelectedCategory
    };
}