import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

export default function IngredientHistoryTable({ history }) {
  const historyPagination = usePagination(history || [], 10);

  const formatRefType = (type) => {
    switch (type) {
      case "sale":
        return "ขายสินค้า";
      case "cancel":
        return "คืนสต๊อก";
      case "restock":
        return "รับวัตถุดิบเข้าคลัง";
      case "adjust":
        return "แอดมินปรับปรุงยอด"; 
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden border border-purple-100 shadow-sm rounded-2xl">
        <table className="w-full text-left bg-white border-collapse">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-purple-700">
                ชื่อวัตถุดิบ
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-purple-700">
                วันที่ทำรายการ
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
                ประเภทรายการ
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
                จำนวนที่เปลี่ยนแปลง
              </th>
            </tr>
          </thead>
          <tbody>
            {historyPagination.paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 font-medium text-center text-gray-400"
                >
                  ยังไม่มีประวัติการเคลื่อนไหวของวัตถุดิบในระบบ
                </td>
              </tr>
            ) : (
              historyPagination.paginatedData.map((item) => (
                <tr
                  key={item.Log_id}
                  className="transition border-t border-purple-50 hover:bg-purple-50/50"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {item.Ingredient_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.Log_datetime).toLocaleString("th-TH")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.Ref_type === "sale"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : item.Ref_type === "import"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}
                    >
                      {formatRefType(item.Ref_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`font-bold text-sm ${Number(item.Qty_change) > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {Number(item.Qty_change) > 0 ? "+" : ""}
                      {Number(item.Qty_change).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {history.length > 0 && (
        <Pagination
          currentPage={historyPagination.currentPage}
          totalPages={historyPagination.totalPages}
          onPageChange={historyPagination.setCurrentPage}
        />
      )}
    </div>
  );
}
