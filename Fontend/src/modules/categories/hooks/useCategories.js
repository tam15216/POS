import {useEffect, useState} from 'react';

import {
    getCategories,
    createCategory,
    deleteCategory
} from '../services/category.service';

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
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

    const addCategory = async (data) => {
        try {
            await createCategory(data);
            loadCategories();
        } catch (err) {
            console.log(err);
        }
    };

    const removeCategory = async (id) => {
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        categories,
        loading,
        addCategory,
        removeCategory
    };
}