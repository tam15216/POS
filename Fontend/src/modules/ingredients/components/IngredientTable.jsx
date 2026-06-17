import ConfirmButton from "../../../shared/components/ConfirmButton";

export default function IngredientTable({
  ingredients,
  onEdit,
  onChangeStatus,
  onManageStock,
  onRestock,
}) {
  return (
    <div className="overflow-hidden border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-purple-100">
          <tr>
            <th className="p-4 font-semibold text-purple-700">ชื่อวัตถุดิบ</th>
            <th className="p-4 font-semibold text-center text-purple-700">
              คงเหลือในคลัง
            </th>
            <th className="p-4 font-semibold text-center text-purple-700">
              หน่วยนับ
            </th>
            <th className="p-4 font-semibold text-center text-purple-700">
              สถานะ
            </th>
            <th className="p-4 font-semibold text-center text-purple-700">
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => {
            const isLow = Number(ing.Stock_qty) <= Number(ing.Minimum_qty);

            const isActive = ing.Is_active === 1;

            return (
              <tr
                key={ing.Ingredient_id}
                className="transition-colors border-t border-purple-50 hover:bg-purple-50/50"
              >
                <td className="p-4 font-medium text-gray-700">
                  {ing.Ingredient_name}
                  {!isActive && (
                    <span className="ml-1 text-xs font-bold text-red-500">
                      (ปิดใช้งาน)
                    </span>
                  )}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {Number(ing.Stock_qty).toLocaleString()}
                </td>
                <td className="p-4 text-center text-gray-600">{ing.Unit}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      !isActive
                        ? "bg-gray-200 text-gray-600"
                        : isLow
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {!isActive
                      ? "ปิดใช้งาน"
                      : isLow
                        ? "วัตถุดิบใกล้หมด"
                        : "ปกติ"}
                  </span>
                </td>
                <td className="p-4 space-x-2 text-center">
                  <button
                    type="button"
                    onClick={() => onRestock(ing)}
                    disabled={!isActive}
                    className="px-3 py-1 text-xs font-semibold text-blue-700 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ซื้อเพิ่ม/รับเข้า
                  </button>

                  <button
                    onClick={() => onManageStock(ing)}
                    disabled={!isActive}
                    className="px-3 py-1 text-xs font-semibold text-green-700 rounded-lg bg-green-50 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ปรับสต๊อก
                  </button>

                  <button
                    onClick={() => onEdit(ing)}
                    className="px-3 py-1 text-xs font-semibold text-purple-700 rounded-lg bg-purple-50 hover:bg-purple-100"
                  >
                    แก้ไข
                  </button>

                  <ConfirmButton
                    title={
                      isActive
                        ? "ยืนยันการปิดใช้งานวัตถุดิบ"
                        : "ยืนยันการเปิดใช้งานวัตถุดิบ"
                    }
                    text={
                      isActive
                        ? `คุณแน่ใจหรือไม่ที่จะปิดใช้งานรายการ "${ing.Ingredient_name}"?`
                        : `คุณแน่ใจหรือไม่ที่จะเปิดใช้งานรายการ "${ing.Ingredient_name}" กลับเข้าสู่ระบบคลังอีกครั้ง?`
                    }
                    icon={isActive ? "warning" : "info"}
                    onConfirm={() =>
                      onChangeStatus(ing.Ingredient_id, isActive)
                    }
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                      isActive
                        ? "text-red-700 bg-red-50 hover:bg-red-100"
                        : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    }`}
                  >
                    {isActive ? "ปิดใช้งาน" : "เปิดใช้งาน"}
                  </ConfirmButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
