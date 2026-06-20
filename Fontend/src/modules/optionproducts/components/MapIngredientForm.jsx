import { useState } from "react";
import OptionIngredientRow from "./OptionIngredientRow";
import useOptionRecipe from "../hooks/useOptionRecipe";
import OptionSearchSelect from "./OptionSearchSelect";
import { confirmProductAction } from "../../../shared/utils/confirm";

export default function MapIngredientForm({
  optionsList,
  ingredientsStore,
  onSaveSuccess,
}) {
  const [selectedOptionId, setSelectedOptionId] = useState("");

  const { mappedIngredients, setMappedIngredients, isLoading } =
    useOptionRecipe(selectedOptionId);

  const addIngredientRow = () => {
    setMappedIngredients([
      ...mappedIngredients,
      { ingredient_id: "", quantity_used: 1 },
    ]);
  };

  const removeIngredientRow = (index) => {
    setMappedIngredients(mappedIngredients.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updated = mappedIngredients.map((row, i) =>
      i === index ? { ...row, [field]: value } : row,
    );
    setMappedIngredients(updated);
  };

  const handleSave = async () => {
    if (!selectedOptionId) return alert("กรุณาเลือกออปชันที่ต้องการผูกสูตร");

    if (mappedIngredients.length === 0) {
      alert("คุณยังไม่ได้เพิ่มวัตถุดิบใน Option");
      return; 
    }

    const hasEmptyRow = mappedIngredients.some(
      (ing) => !ing.ingredient_id || ing.quantity_used <= 0,
    );
    if (hasEmptyRow) return alert("กรุณากรอกข้อมูลวัตถุดิบและปริมาณให้ถูกต้อง");

    try {
      const result = await confirmProductAction(false, "การบันทึกสูตร Option");

      if (result.isConfirmed) {
        await onSaveSuccess(selectedOptionId, mappedIngredients);
        setSelectedOptionId("");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์";
      alert(`ไม่สามารถบันทึกสูตรออปชันได้: ${errorMessage}`);
    }
  };

  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
      <h2 className="mb-2 text-lg font-bold text-gray-700">
        ผูกสูตรการหักสต๊อกวัตถุดิบ
      </h2>
      <p className="mb-4 text-xs text-gray-400">
        กำหนดปริมาณการหักคลังจริงเมื่อลูกค้าเลือกออปชันนี้ในขั้นตอนขายสินค้า
      </p>

      <div className="space-y-4">
        <div className="w-72">
          <label className="block mb-1 text-xs font-semibold text-gray-500">
            เลือกออปชันหลัก
          </label>

          <OptionSearchSelect
            optionsList={optionsList}
            value={selectedOptionId}
            onChange={(val) => setSelectedOptionId(val)}
          />
        </div>

        <div className="pt-4 space-y-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-purple-700">
              รายการวัตถุดิบตัดคลัง
            </h3>
            <button
              type="button"
              onClick={addIngredientRow}
              className="px-3 py-1 text-xs font-semibold text-purple-700 transition-colors border border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100"
            >
              + เพิ่มวัตถุดิบใน Option
            </button>
          </div>

          {isLoading ? (
            <div className="py-8 text-xs font-medium text-center text-purple-500">
              กำลังค้นหาข้อมูลสูตรวัตถุดิบ...
            </div>
          ) : mappedIngredients.length === 0 ? (
            <div className="py-8 text-xs text-center text-gray-400 border border-gray-200 border-dashed rounded-xl">
              ยังไม่มีการผูก Option (กลุ่มระดับความหวานปล่อยว่างไว้ได้เลย)
            </div>
          ) : (
            <div className="space-y-2">
              {mappedIngredients.map((row, index) => (
                <OptionIngredientRow
                  key={index}
                  row={row}
                  index={index}
                  ingredientsStore={ingredientsStore}
                  onChange={handleRowChange}
                  onRemove={removeIngredientRow}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 text-sm font-medium text-white transition-colors bg-purple-600 shadow-md rounded-xl hover:bg-purple-700 shadow-purple-100"
          >
            บันทึกสูตรออปชัน
          </button>
        </div>
      </div>
    </div>
  );
}
