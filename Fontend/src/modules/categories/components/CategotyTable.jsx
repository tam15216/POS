import ConfirmButton from "../../../shared/components/ConfirmButton";
import StatusToggleButton from "../../../shared/components/StatusToggleButton";

export default function CategoryTable({ categories, onDelete }) {
  return (
    <div className="overflow-hidden border border-purple-100 rounded-2xl">
      <table className="w-full">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              ชื่อหมวดหมู่
            </th>

            <th className="w-32 px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              จัดการ
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {categories.map((item) => (
            <tr
              key={item.Category_id}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {item.Category_name}
              </td>

              <td className="px-6 py-4 text-center">
                <ConfirmButton
                  title={
                    item.Status ? "ปิดใช้งานหมวดหมู่" : "เปิดใช้งานหมวดหมู่"
                  }
                  text={`ต้องการ ${item.Status ? "ปิด" : "เปิด"} ใช้งานหมวดหมู่หรือไม่`}
                  icon="warning"
                  onConfirm={() => onDelete(item.Category_id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    item.Status === 1 || item.Status === true
                      ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                      : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {item.Status === 1 || item.Status === true
                    ? "ปิดสถานะ"
                    : "เปิดสถานะ"}
                </ConfirmButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
