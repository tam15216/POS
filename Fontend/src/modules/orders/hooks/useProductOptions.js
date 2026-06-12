// useProductOptions.js
import { useState, useEffect } from "react";
import { getActiveOptions } from "../../optionproducts/services/option.service";

export default function useProductOptions() {
  const [allOptions, setAllOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setIsLoading(true);

        const data = await getActiveOptions();

        setAllOptions(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load options from DB:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOptions();
  }, []);

  return { allOptions, isLoading, error };
}
