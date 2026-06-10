import { useState, useEffect } from "react";
import { saveRecipe, getRecipe } from "../services/recipe.service"; // อิมพอร์ตฟังก์ชัน getRecipe เพิ่มเข้ามา

export default function RecipeForm({ products, ingredients }) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [recipeItems, setRecipeItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!selectedProductId) {
      setRecipeItems([]);
      return;
    }

    const fetchOldRecipe = async () => {
      try {
        const oldIngredients = await getRecipe(selectedProductId);
        if (oldIngredients && oldIngredients.length > 0) {
          setRecipeItems(oldIngredients);
        } else {
          setRecipeItems([{ ingredient_id: "", quantity_used: "" }]);
        }
      } catch (err) {
        console.error("Failed to load recipe details", err);
        setRecipeItems([{ ingredient_id: "", quantity_used: "" }]);
      }
    };

    fetchOldRecipe();
  }, [selectedProductId]);

  const addRow = () =>
    setRecipeItems([...recipeItems, { ingredient_id: "", quantity_used: "" }]);

  const removeRow = (index) =>
    setRecipeItems(recipeItems.filter((_, i) => i !== index));

  const handleRowChange = (index, field, value) => {
    const updated = [...recipeItems];
    updated[index][field] = value;
    setRecipeItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId || recipeItems.length === 0)
      return alert("กรุณากรอกข้อมูลให้ครบถ้วน");

    const hasInvalidItem = recipeItems.some(
      (item) =>
        !item.ingredient_id ||
        !item.quantity_used ||
        Number(item.quantity_used) <= 0,
    );
    if (hasInvalidItem) {
      return alert(
        "กรุณาเลือกวัตถุดิบและใส่ปริมาณที่มากกว่า 0 ให้ครบถ้วนทุกแถว",
      );
    }

    try {
      setIsSubmitting(true);
      await saveRecipe({
        product_id: selectedProductId,
        ingredients: recipeItems,
      });
      alert("อัปเดตและบันทึกสูตรส่วนผสมเรียบร้อยแล้ว");
      setSelectedProductId("");
      setRecipeItems([]);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกสูตร");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white border border-purple-100 shadow-sm rounded-3xl"
    >
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          1. เลือกสินค้าที่ต้องการตั้งสูตร / แก้ไขสูตร
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-purple-500"
          required
        >
          <option value="">-- เลือกสินค้า --</option>
          {products.map((p) => (
            <option key={p.Product_id} value={p.Product_id}>
              {p.Product_name} (
              {p.Product_type === "made_to_order"
                ? "มีสูตรอยู่แล้ว"
                : "สินค้าทั่วไปยังไม่มีสูตร"}
              )
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="block font-semibold text-gray-700">
          2. รายการส่วนผสมต่อ 1 หน่วยหน่วยผลิต (แก้ว/ชิ้น)
        </label>
        <div className="max-h-[320px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {recipeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <select
                value={item.ingredient_id}
                onChange={(e) =>
                  handleRowChange(index, "ingredient_id", e.target.value)
                }
                className="flex-1 p-2.5 border rounded-xl focus:outline-purple-500"
                required
              >
                <option value="">-- เลือกวัตถุดิบ --</option>
                {ingredients.map((ing) => (
                  <option key={ing.Ingredient_id} value={ing.Ingredient_id}>
                    {ing.Ingredient_name} ({ing.Unit})
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="ปริมาณที่ใช้"
                value={item.quantity_used}
                onChange={(e) =>
                  handleRowChange(index, "quantity_used", e.target.value)
                }
                className="w-40 p-2.5 border rounded-xl focus:outline-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="px-2 font-bold text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {selectedProductId && (
          <button
            type="button"
            onClick={addRow}
            className="pt-2 text-sm font-semibold text-purple-700 hover:underline"
          >
            + เพิ่มวัตถุดิบในสูตร
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !selectedProductId}
        className="w-full p-3 font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 disabled:bg-gray-300"
      >
        {isSubmitting ? "กำลังบันทึกสูตร..." : "บันทึกและปรับปรุงสูตรผสม"}
      </button>
    </form>
  );
}
