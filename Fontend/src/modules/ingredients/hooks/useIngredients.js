import { useState, useEffect } from "react";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getStockHistory,
  updateStockQuantity
} from "../services/ingredient.service";

export default function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const [ingredientsData, historyData] = await Promise.all([
        getIngredients(),
        getStockHistory(),
      ]);
      setIngredients(ingredientsData);
      setHistory(historyData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = async (formData) => {
    const data = await createIngredient(formData);
    await loadIngredients();
    return data;
  };

  const editIngredient = async (id, formData) => {
    const data = await updateIngredient(id, formData);
    await loadIngredients();
    return data;
  };

  const removeIngredient = async (id) => {
    const data = await deleteIngredient(id);
    await loadIngredients();
    return data;
  };

  const changeStock = async (id, txData) => {
    const data = await updateStockQuantity(id, txData);
    await loadIngredients();
    return data;
};

  useEffect(() => {
    loadIngredients();
  }, []);

  return {
    ingredients,
    history,
    loading,
    addIngredient,
    editIngredient,
    removeIngredient,
    changeStock,
    refresh: loadIngredients,
  };
}
