export default function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="w-full overflow-x-auto bg-white border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full border-collapse min-w-[450px]">
        <thead className="sticky top-0 z-10 bg-purple-100 shadow-[0_1px_0_0_rgba(233,213,255,1)]">
          <tr>
            <th className="px-3 py-3 text-sm font-semibold text-left text-purple-700 min-w-[120px]">
              สินค้า
            </th>
            <th className="px-2 py-3 text-sm font-semibold text-center text-purple-700 w-[110px]">
              จำนวน
            </th>
            <th className="px-2 py-3 text-sm font-semibold text-center text-purple-700 w-[80px]">
              ราคา/หน่วย
            </th>
            <th className="px-2 py-3 text-sm font-semibold text-center text-purple-700 w-[90px]">
              รวมราคา
            </th>
            <th className="px-2 py-3 text-sm font-semibold text-center text-purple-700 w-[70px]">
              แก้ไข
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${item.Product_id}-${index}`}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-3 py-3 text-sm font-medium text-gray-700">
                <div
                  className="break-words max-w-[150px] sm:max-w-none"
                  title={item.Product_name}
                >
                  {item.Product_name}
                </div>
                {item.selected_options && item.selected_options.length > 0 && (
                  <div className="text-[11px] text-purple-600 font-normal mt-1 flex flex-wrap gap-1">
                    {item.selected_options.map((opt) => (
                      <span
                        key={opt.Option_id}
                        className="bg-purple-50 px-1.5 py-0.5 rounded-md border border-purple-100"
                      >
                        {opt.Option_name}
                      </span>
                    ))}
                  </div>
                )}
              </td>

              <td className="px-2 py-3">
                <div className="flex items-center justify-center gap-1.5 select-none">
                  <button
                    onClick={() =>
                      onDecrease(item.Product_id, item.selected_options)
                    }
                    className="w-6 h-6 text-sm font-bold text-red-600 transition-transform bg-red-100 rounded active:scale-95"
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-sm text-center font-bold text-gray-800">
                    {item.qty}
                  </span>
                  <button
                    onClick={() =>
                      onIncrease(item.Product_id, item.selected_options)
                    }
                    className="w-6 h-6 text-sm font-bold text-green-600 transition-transform bg-green-100 rounded active:scale-95"
                  >
                    +
                  </button>
                </div>
              </td>

              <td className="px-2 py-3 font-mono text-sm text-center text-gray-700">
                ฿{Number(item.Display_price).toLocaleString()}
              </td>

              <td className="px-2 py-3 font-mono text-sm font-bold text-center text-purple-700">
                ฿{Number(item.Display_price * item.qty).toLocaleString()}
              </td>

              <td className="px-2 py-3 text-center">
                <button
                  onClick={() =>
                    onRemove(item.Product_id, item.selected_options)
                  }
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-sm"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
