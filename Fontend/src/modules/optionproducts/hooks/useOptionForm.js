// hooks/useOptionForm.js
import { useState, useEffect } from "react";
import { confirmProductAction } from "../../../shared/utils/confirm";

export default function useOptionForm(initialData, onCreateSuccess) {
  const [optionName, setOptionName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({ optionName: "", price: "" });

  useEffect(() => {
    if (initialData) {
      setOptionName(initialData.Option_name || "");
      setPrice(initialData.Price || "");
    } else {
      setOptionName("");
      setPrice("");
    }
    setErrors({ optionName: "", price: "" });
  }, [initialData]);

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateAndSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { optionName: "", price: "" };

    if (!optionName.trim()) {
      newErrors.optionName = "กรุณาระบุชื่อตัวเลือก";
      isValid = false;
    }

    if (price === "" || price === null) {
      newErrors.price = "กรุณาระบุราคาเพิ่ม";
      isValid = false;
    } else if (Number(price) < 0) {
      newErrors.price = "ราคาเพิ่มต้องไม่ต่ำกว่า 0 บาท";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      const result = await confirmProductAction(!!initialData, "Option");

      if (result.isConfirmed) {
        await onCreateSuccess({
          Option_name: optionName,
          Price: Number(price),
        });
      }
    } catch (err) {
      console.error("Form submission failed:", err);
    }
  };

  return {
    optionName,
    setOptionName: (val) => handleInputChange("optionName", val, setOptionName),
    price,
    setPrice: (val) => handleInputChange("price", val, setPrice),
    errors,
    validateAndSubmit,
  };
}
