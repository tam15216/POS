import { useState, useEffect } from "react";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  getStockHistory,
  updateStockQuantity,
  restockIngredient as restockIngredientApi,
  toggleIngredientStatus as toggleIngredientStatusApi, 
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

  const changeStock = async (id, txData) => {
    const data = await updateStockQuantity(id, txData);
    await loadIngredients();
    return data;
  };

  const restockIngredient = async (id, restockData) => {
    const data = await restockIngredientApi(id, restockData);
    await loadIngredients();
    return data;
  };


  const changeIngredientStatus = async (id, currentStatus) => {
    const data = await toggleIngredientStatusApi(id, {
      is_active: !currentStatus,
    });
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
    changeStock,
    restockIngredient,
    changeIngredientStatus, 
    refresh: loadIngredients,
  };
}
