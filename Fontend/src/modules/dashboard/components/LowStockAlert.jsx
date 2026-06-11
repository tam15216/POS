export default function LowStockAlert({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[442px] bg-white border border-purple-100 shadow-sm rounded-2xl p-6">
        <div className="flex items-center justify-center w-12 h-12 mb-3 text-xl font-bold text-green-500 rounded-full bg-green-50">
          ✓
        </div>
        <p className="font-medium text-gray-500">สต๊อกสินค้าและวัตถุดิบปกติ</p>
        <p className="mt-1 text-xs text-gray-400">
          ไม่มีรายการใดที่ต่ำกว่าเกณฑ์ขั้นต่ำ
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between w-full h-full p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
            </span>
            <h3 className="text-xl font-bold text-gray-700">
              รายการใกล้หมดคลัง
            </h3>
          </div>
          <span className="px-3 py-1 text-xs font-semibold text-red-700 border border-red-100 rounded-full bg-red-50">
            ใกล้หมด {items.length} รายการ
          </span>
        </div>

        <div className="overflow-x-auto min-h-[360px] max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="text-sm font-semibold text-purple-700 border-b border-purple-50">
                <th className="pb-3 pl-2 bg-white">ประเภท</th>
                <th className="pb-3 bg-white">รหัส/โค้ด</th>
                <th className="pb-3 bg-white">ชื่อรายการ</th>
                <th className="pb-3 pr-2 text-right bg-white">คงเหลือล่าสุด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50/50">
              {items.map((item) => (
                <tr
                  key={`${item.item_type}-${item.item_id}`}
                  className="text-gray-600 transition-colors hover:bg-purple-50/30"
                >
                  <td className="py-3.5 pl-2">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md ${
                        item.item_type === "product"
                          ? "text-blue-700 bg-blue-50 border border-blue-100"
                          : "text-purple-700 bg-purple-50 border border-purple-100"
                      }`}
                    >
                      {item.item_type === "product" ? "สินค้า" : "วัตถุดิบ"}
                    </span>
                  </td>

                  <td className="py-3.5 font-mono text-xs text-gray-400">
                    {item.item_code && item.item_code !== "-"
                      ? item.item_code
                      : `#${item.item_id}`}
                  </td>

                  <td className="py-3.5 font-medium text-gray-700 max-w-[180px] truncate">
                    {item.item_name}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md ${
                        Number(item.current_qty) === 0
                          ? "text-red-700 bg-red-100 animate-pulse"
                          : "text-amber-700 bg-amber-50"
                      }`}
                    >
                      {Number(item.current_qty)} {item.unit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
