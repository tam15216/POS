// AddOptionForm.jsx
import useOptionForm from "../hooks/useOptionForm";

export default function AddOptionForm({
  onCreateSuccess,
  onClose,
  initialData,
}) {
  const {
    optionName,
    setOptionName,
    price,
    setPrice,
    errors,
    validateAndSubmit,
  } = useOptionForm(initialData, onCreateSuccess);

  return (
    <div className="p-6 bg-white border border-purple-100 shadow-2xl rounded-3xl">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        {initialData ? "แก้ไขรายการ Option" : "เพิ่มรายการ Option ใหม่"}
      </h2>
      <form onSubmit={validateAndSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block mb-1 text-xs font-semibold text-gray-500">
            ชื่อออปชัน (เช่น เพิ่มไข่มุก, หวานน้อย)
          </label>
          <input
            type="text"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-colors ${
              errors.optionName
                ? "border-red-500 focus:border-red-500 bg-red-50/30"
                : "border-gray-200 focus:border-purple-500"
            }`}
            placeholder="ระบุชื่อตัวเลือก"
          />
          {errors.optionName && (
            <p className="mt-1 text-xs font-medium text-red-500 duration-100 animate-in fade-in">
              {errors.optionName}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-xs font-semibold text-gray-500">
            ราคาเพิ่ม (บาท)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none transition-colors ${
              errors.price
                ? "border-red-500 focus:border-red-500 bg-red-50/30"
                : "border-gray-200 focus:border-purple-500"
            }`}
            placeholder="0"
            min="0"
          />
          {errors.price && (
            <p className="mt-1 text-xs font-medium text-red-500 duration-100 animate-in fade-in">
              {errors.price}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className={`py-2.5 text-white font-medium text-sm rounded-xl transition-colors shadow-md ${
              initialData
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-100"
                : "bg-purple-600 hover:bg-purple-700 shadow-purple-100"
            }`}
          >
            {initialData ? "บันทึกการแก้ไข" : "สร้าง Option"}
          </button>
        </div>
      </form>
    </div>
  );
}
