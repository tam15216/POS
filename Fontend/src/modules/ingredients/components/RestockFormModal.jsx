import { useState, useEffect } from "react";
import { validateIngredientRestock } from "../validations/Ingredient.validations";
import { confirmProductAction } from "../../../shared/utils/confirm";

export default function RestockFormModal({
  isOpen,
  onClose,
  onSave,
  ingredient,
}) {
  const [formData, setFormData] = useState({
    quantity_received: "",
    buy_price: "",
  });

  const [errors, setErrors] = useState({
    quantity_received: "",
    buy_price: "",
  });

  useEffect(() => {
    setFormData({ quantity_received: "", buy_price: "" });
    setErrors({ quantity_received: "", buy_price: "" });
  }, [isOpen, ingredient]);

  if (!isOpen || !ingredient) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } =
      validateIngredientRestock(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const result = await confirmProductAction(
      false,
      `ยอดรับเข้า ${ingredient.Ingredient_name}`,
    );
    if (!result.isConfirmed) return;

    const payload = {
      quantity_received: Number(formData.quantity_received),
      buy_price: Number(formData.buy_price),
      action_type: "restock",
    };

    onSave(ingredient.Ingredient_id, payload);
  };

  const qtyInStock = Number(ingredient.Stock_qty) || 0;
  const costInStock = Number(ingredient.Cost_per_unit) || 0;
  const inputQty = Number(formData.quantity_received) || 0;
  const inputPrice = Number(formData.buy_price) || 0;

  const totalQtyAfter = qtyInStock + inputQty;
  const estimatedCost =
    totalQtyAfter > 0
      ? (qtyInStock * costInStock + inputPrice) / totalQtyAfter
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-3xl">
        <div className="p-6 border-b border-gray-100 bg-purple-50/50">
          <h3 className="text-lg font-bold text-gray-800">
            รับวัตถุดิบเข้าคลัง & คำนวณต้นทุน
          </h3>
          <p className="mt-1 text-xs font-medium text-purple-600">
            วัตถุดิบ: {ingredient.Ingredient_name}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          <div className="p-3 space-y-1 text-xs text-gray-600 bg-gray-50 rounded-xl">
            <div>
              คงเหลือในคลังปัจจุบัน:{" "}
              <span className="font-bold text-gray-800">{qtyInStock}</span>{" "}
              {ingredient.Unit}
            </div>
            <div>
              ต้นทุนต่อหน่วยเดิม:{" "}
              <span className="font-bold text-gray-800">
                {costInStock.toFixed(2)}
              </span>{" "}
              บาท
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              จำนวนที่ซื้อมาเพิ่ม ({ingredient.Unit})
            </label>
            <input
              type="number"
              name="quantity_received"
              value={formData.quantity_received}
              onChange={handleChange}
              className={`w-full p-3 bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.quantity_received
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:outline-purple-500"
              }`}
              placeholder="เช่น 500"
              step="any"
            />
            {errors.quantity_received && (
              <p className="mt-1 text-xs font-medium text-red-500">
                {errors.quantity_received}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              ราคารวมที่ซื้อมาครั้งนี้ (บาท)
            </label>
            <input
              type="number"
              name="buy_price"
              value={formData.buy_price}
              onChange={handleChange}
              className={`w-full p-3 bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.buy_price
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:outline-purple-500"
              }`}
              placeholder="เช่น 150"
              step="any"
            />
            {errors.buy_price && (
              <p className="mt-1 text-xs font-medium text-red-500">
                {errors.buy_price}
              </p>
            )}
          </div>

          {inputQty > 0 &&
            inputPrice > 0 &&
            !errors.quantity_received &&
            !errors.buy_price && (
              <div className="p-3 text-xs text-purple-900 border border-purple-100 bg-purple-50 rounded-xl">
                <div>
                  จำนวนรวมในคลังหลังบันทึก: <b>{totalQtyAfter}</b>{" "}
                  {ingredient.Unit}
                </div>
                <div className="mt-1 font-bold">
                  ต้นทุนเฉลี่ยใหม่: {estimatedCost.toFixed(4)} บาท /{" "}
                  {ingredient.Unit}
                </div>
              </div>
            )}

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-purple-600 shadow-sm hover:bg-purple-700 rounded-xl"
            >
              บันทึกรับเข้าคลัง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
