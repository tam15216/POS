// src/dashboard/components/TopSellingProducts.jsx

export default function TopSellingProducts({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <p className="font-medium text-gray-500">ยังไม่มีข้อมูลการขาย</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-700">
          สินค้าขายดี 5 อันดับแรก (ประจำเดือนนี้)
        </h3>
        <span className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg">
          ยอดนิยม
        </span>
      </div>

      <div className="overflow-x-auto max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="text-sm font-semibold text-purple-700 border-b border-purple-50">
              <th className="pb-3 pl-2">สินค้า</th>
              <th className="pb-3 text-center">จำนวนที่ขายได้</th>
              <th className="pb-3 pr-2 text-right">สร้างรายได้</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50/50">
            {items.map((item, index) => (
              <tr
                key={item.Product_id}
                className="text-gray-600 transition-colors hover:bg-purple-50/30"
              >
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                            ? "bg-slate-100 text-slate-700"
                            : index === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-700 max-w-[180px] truncate">
                        {item.Product_name}
                      </p>
                      <p className="font-mono text-xs text-gray-400">
                        {item.Product_code || `#${item.Product_id}`}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-center font-semibold text-gray-700">
                  {Number(item.total_qty_sold)} ชิ้น
                </td>
                <td className="py-3.5 text-right pr-2 font-bold text-purple-600">
                  ฿{Number(item.total_revenue).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
