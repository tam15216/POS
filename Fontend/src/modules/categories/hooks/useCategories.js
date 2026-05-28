import {useEffect, useState} from 'react';

import {
    getCategories,
    createCategory,
    toggleCategory,
    getCategories_notall
} from '../services/category.service';

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [categories_notall, setCategories_notall] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
        loadCategories_notall();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories_notall = async () => {
        try {
            setLoading(true);
            const data = await getCategories_notall();
            setCategories_notall(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };



    const addCategory = async (data) => {
        try {
            await createCategory(data);
            loadCategories();
        } catch (err) {
            console.log(err);
        }
    };

    const toggleCategorys = async (id) => {
        try {
            await toggleCategory(id);
            loadCategories();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        categories,
        loading,
        addCategory,
        toggleCategorys,
        loadCategories_notall,
        categories_notall
        
    };
}