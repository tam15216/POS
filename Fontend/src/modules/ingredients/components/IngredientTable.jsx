import ConfirmButton from "../../../shared/components/ConfirmButton"; 
export default function IngredientTable({
  ingredients,
  onEdit,
  onDelete,
  onManageStock,
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
            return (
              <tr
                key={ing.Ingredient_id}
                className="border-t border-purple-50 hover:bg-purple-50/50"
              >
                <td className="p-4 font-medium text-gray-700">
                  {ing.Ingredient_name}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {Number(ing.Stock_qty).toLocaleString()}
                </td>
                <td className="p-4 text-center text-gray-600">{ing.Unit}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isLow
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isLow ? "วัตถุดิบใกล้หมด" : "ปกติ"}
                  </span>
                </td>
                <td className="p-4 space-x-2 text-center">
                  <button
                    onClick={() => onEdit(ing)}
                    className="px-3 py-1 text-xs font-semibold text-purple-700 rounded-lg bg-purple-50 hover:bg-purple-100"
                  >
                    แก้ไข
                  </button>

                  <button
                    onClick={() => onManageStock(ing)}
                    className="px-3 py-1 text-xs font-semibold text-green-700 rounded-lg bg-green-50 hover:bg-green-100"
                  >
                    ปรับสต๊อก
                  </button>

                  <ConfirmButton
                    title="ยืนยันการลบวัตถุดิบ"
                    text={`คุณแน่ใจหรือไม่ที่จะลบรายการ "${ing.Ingredient_name}" ออกจากระบบ?`}
                    icon="warning"
                    onConfirm={() => onDelete(ing.Ingredient_id)}
                    className="px-3 py-1 text-xs font-semibold text-red-700 rounded-lg bg-red-50 hover:bg-red-100"
                  >
                    ลบ
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
