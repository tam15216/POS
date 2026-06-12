import { useState, useEffect } from "react";
import { getOptionRecipe } from "../services/option.service";

export default function useOptionRecipe(selectedOptionId) {
  const [mappedIngredients, setMappedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptionRecipe = async () => {
      if (!selectedOptionId) {
        setMappedIngredients([]);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getOptionRecipe(selectedOptionId);
        setMappedIngredients(data);
      } catch (err) {
        console.error("โหลดข้อมูลสูตรวัตถุดิบล้มเหลว:", err);
        setMappedIngredients([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptionRecipe();
  }, [selectedOptionId]);

  return {
    mappedIngredients,
    setMappedIngredients,
    isLoading
  };
}