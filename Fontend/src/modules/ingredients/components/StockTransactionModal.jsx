import { useState, useEffect } from "react";
import { confirmProductAction } from "../../../shared/utils/confirm";
import { validateIngredientStock } from "../validations/Ingredient.validations";

export default function StockTransactionModal({
  isOpen,
  onClose,
  onSave,
  ingredient,
}) {
  const [transaction, setTransaction] = useState({
    action_type: "restock",
    quantity: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setTransaction({ action_type: "restock", quantity: "" });
    setError(""); 
  }, [isOpen, ingredient]);

  if (!isOpen || !ingredient) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    // 💡 ตรวจสอบข้อมูลผ่านฟังก์ชัน Validation
    const errorMessage = validateIngredientStock(transaction);
    if (errorMessage) {
      setError(errorMessage); 
      return;
    }

    const qty = Number(transaction.quantity);

    if (qty <= 0) {
      setError("กรุณากรอกจำนวนที่มากกว่า 0");
      return;
    }

    const isEditMode = transaction.action_type === "adjust";
    const result = await confirmProductAction(
      isEditMode,
      `สต๊อกสินค้า [${ingredient.Ingredient_name}]`,
    );

    if (result.isConfirmed) {
      onSave(ingredient.Ingredient_id, {
        action_type: transaction.action_type,
        quantity: qty,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden duration-150 bg-white shadow-xl rounded-3xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-purple-50/50">
          <h3 className="text-lg font-bold text-gray-800">
            ปรับปรุงคลัง: {ingredient.Ingredient_name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="px-1 font-bold text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              เลือกประเภทการปรับปรุง
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setTransaction((prev) => ({
                    ...prev,
                    action_type: "restock",
                  }));
                  setError(""); 
                }}
                className={`p-3 rounded-xl font-semibold border text-center transition-all ${
                  transaction.action_type === "restock"
                    ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                รับเข้าคลัง (+)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTransaction((prev) => ({
                    ...prev,
                    action_type: "adjust",
                  }));
                  setError(""); 
                }}
                className={`p-3 rounded-xl font-semibold border text-center transition-all ${
                  transaction.action_type === "adjust"
                    ? "bg-red-50 border-red-500 text-red-700 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                ปรับปรุงลดลง (-)
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              จำนวนวัตถุดิบ ({ingredient.Unit})
            </label>
            <input
              type="number"
              step="0.01"
              value={transaction.quantity}
              onChange={(e) => {
                setTransaction((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                }));
                setError(""); 
              }}
              className={`w-full p-3 border rounded-xl focus:outline-none transition-all ${
                error
                  ? "border-red-400 focus:border-red-500 bg-red-50/30"
                  : "border-gray-200 focus:border-purple-500"
              }`}
              placeholder="กรอกจำนวนตัวเลข"
            />
            {error && (
              <p className="mt-1.5 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                 {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
            >
              บันทึกรายการ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
