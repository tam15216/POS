export default function StockHistoryTable({ history }) {
  return (
    <div className="overflow-hidden border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full bg-white">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              ชื่อสินค้า
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              วันที่ทำรายการ
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
              ประเภท
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
              จำนวนที่เพิ่ม/ลด
            </th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr
              key={index}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              {/* Product Name */}
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {item.Product_name}
              </td>
              {/* Product Created_at */}
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {new Date(item.Created_at).toLocaleString('th-TH')}
              </td>

              {/* Ref Type */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`
                                    inline-block
                                    px-4
                                    py-1.5
                                    rounded-full
                                    text-sm
                                    font-semibold

                                    ${
                                      item.Ref_type === "sale"
                                        ? "bg-red-100 text-red-600"
                                        : item.Ref_type === "import"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-yellow-100 text-yellow-700"
                                    }
                                `}
                >
                  {item.Ref_type}
                </span>
              </td>

              {/* Qty */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`
                                    font-bold

                                    ${
                                      Number(item.Qty_change) > 0
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }
                                `}
                >
                  {Number(item.Qty_change) > 0 ? "+" : ""}
                  {item.Qty_change}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
