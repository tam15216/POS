import { useState, useEffect } from "react";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient
} from "../services/ingredient.service";

export default function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await getIngredients();
      setIngredients(data);
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

  useEffect(() => {
    loadIngredients();
  }, []);

  return { 
        ingredients, 
        loading, 
        addIngredient, 
        editIngredient, 
        removeIngredient, 
        refresh: loadIngredients 
    };
}
