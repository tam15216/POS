// src/modules/productoption/hooks/useOptionsList.js
import { useState, useEffect, useCallback } from "react";
import { getOptions } from "../../orders/services/order.service";

export default function useOptionsList() {
  const [optionsList, setOptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getOptions();
      setOptionsList(data);
    } catch (err) {
      console.error("โหลดข้อมูลรายการ Option ล้มเหลว:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "โหลดข้อมูลรายการ Option ล้มเหลว";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return {
    optionsList,
    isLoading,
    error,
    refreshOptions: loadOptions, 
  };
}
