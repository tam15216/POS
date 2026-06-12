import { useState, useEffect } from "react";
import { confirmProductAction } from "../../../shared/utils/confirm";

export default function IngredientForm({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    Ingredient_name: "",
    Stock_qty: "",
    Unit: "",
    Minimum_qty: "",
    Buy_price: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        Ingredient_name: editData.Ingredient_name || "",
        Stock_qty: editData.Stock_qty ?? "",
        Unit: editData.Unit || "",
        Minimum_qty: editData.Minimum_qty ?? "",
        Buy_price: editData.Buy_price || "",
      });
    } else {
      setFormData({
        Ingredient_name: "",
        Stock_qty: "",
        Unit: "",
        Minimum_qty: "",
        Buy_price: "",
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditMode = !!editData;
    const result = await confirmProductAction(isEditMode, "วัตถุดิบ");

    if (result.isConfirmed) {
      let payload = {
        Ingredient_name: formData.Ingredient_name,
        Unit: formData.Unit,
        Minimum_qty: Number(formData.Minimum_qty),
      };

      if (!isEditMode) {
        const totalQty = Number(formData.Stock_qty) || 0;
        const buyPrice = Number(formData.Buy_price) || 0;
        const costPerUnit = totalQty > 0 ? buyPrice / totalQty : 0;

        payload.Stock_qty = totalQty;
        payload.Buy_price = buyPrice;
        payload.Cost_per_unit = costPerUnit;
      }

      onSave(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden bg-white shadow-xl rounded-3xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <h3 className="text-xl font-bold text-gray-800">
            {editData
              ? "📝 แก้ไขข้อมูลวัตถุดิบ"
              : "➕ เพิ่มวัตถุดิบใหม่เข้าคลัง"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="px-2 text-xl font-bold text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                ชื่อวัตถุดิบ
              </label>
              <input
                type="text"
                name="Ingredient_name"
                value={formData.Ingredient_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-purple-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                หน่วยนับ (เช่น กรัม, มิลลิลิตร)
              </label>
              <input
                type="text"
                name="Unit"
                value={formData.Unit}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-purple-500"
                required
              />
            </div>
            {!editData && (
              <>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    จำนวนที่รับเข้าคลัง ({formData.Unit || "หน่วย"})
                  </label>
                  <input
                    type="number"
                    name="Stock_qty"
                    value={formData.Stock_qty}
                    onChange={handleChange}
                    className="w-full p-3 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-purple-500"
                    placeholder="เช่น 10"
                    min="0"
                    step="any"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-purple-700">
                    ราคารวมที่ซื้อมา (บาท)
                  </label>
                  <input
                    type="number"
                    name="Buy_price"
                    value={formData.Buy_price}
                    onChange={handleChange}
                    className="w-full p-3 border border-purple-200 rounded-xl focus:outline-purple-500 bg-purple-50/20"
                    placeholder="เช่น 100"
                    min="0"
                    step="any"
                    required
                  />
                </div>
              </>
            )}

            <div className={editData ? "md:col-span-2" : ""}>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                จำนวนขั้นต่ำระบบแจ้งเตือน
              </label>
              <input
                type="number"
                name="Minimum_qty"
                value={formData.Minimum_qty}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-purple-500"
                min="0"
                required
              />
            </div>

            {!editData && formData.Stock_qty > 0 && formData.Buy_price > 0 && (
              <div className="p-3 text-xs font-medium text-gray-500 md:col-span-2 bg-gray-50 rounded-xl">
                💡 สรุปต้นทุนวัตถุดิบเฉลี่ย:{" "}
                <span className="font-bold text-purple-700">
                  {(formData.Buy_price / formData.Stock_qty).toFixed(2)}
                </span>{" "}
                บาท ต่อ 1 {formData.Unit || "หน่วย"}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 font-semibold text-white rounded-xl transition-colors ${
                editData
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {editData ? "บันทึกการแก้ไข" : "เพิ่มวัตถุดิบ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
