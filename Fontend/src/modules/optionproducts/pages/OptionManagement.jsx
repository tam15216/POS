import { useEffect, useState } from "react";
import { getOptions } from "../../orders/services/order.service";
import {
  getAllIngredients,
  updateOptionMapping,
} from "../services/option.service";

import MapIngredientForm from "../components/MapIngredientForm";

export default function OptionManagement() {
  const [optionsList, setOptionsList] = useState([]);
  const [ingredientsStore, setIngredientsStore] = useState([]);

  const fetchData = async () => {
    try {
      const [resOptions, resIngredients] = await Promise.all([
        getOptions(),
        getAllIngredients(),
      ]);
      setOptionsList(resOptions.filter((opt) => opt.Is_active === 1));
      setIngredientsStore(resIngredients);
    } catch (err) {
      alert("โหลดข้อมูลเริ่มต้นจากระบบล้มเหลว");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveMapping = async (optionId, ingredientsData) => {
    try {
      await updateOptionMapping(optionId, ingredientsData);
      alert("บันทึกสูตรวัตถุดิบสำหรับออปชันเรียบร้อย");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกสูตรวัตถุดิบ");
      throw err;
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      <div className="pb-4 border-b">
        <h1 className="text-3xl font-bold text-purple-700">
          กำหนดสูตรหักสต๊อก Option
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          ผูกความสัมพันธ์ของตัวเลือกเสริมเครื่องดื่มร่วมกับปริมาณการใช้วัตถุดิบจริงเพื่อตัดคลังสินค้า
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <MapIngredientForm
            optionsList={optionsList}
            ingredientsStore={ingredientsStore}
            onSaveSuccess={handleSaveMapping}
          />
        </div>
      </div>
    </div>
  );
}
