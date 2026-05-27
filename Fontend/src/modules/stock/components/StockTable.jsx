export default function StockTable({ stocks }) {
  return (
    <div className="overflow-hidden border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full bg-white">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              ชื่อสินค้า
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
              จำนวนคงเหลือ
            </th>
          </tr>
        </thead>

        <tbody>
          {stocks.map((item) => (
            <tr
              key={item.Product_id}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {item.Product_name}
              </td>

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
                            item.Qty <= 0
                            ? "bg-red-100 text-red-700"
                            : "bg-purple-100 text-purple-700"
                        }
                        `}
                >
                  {item.Qty <= 0 ? "สินค้าหมด" : item.Qty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
