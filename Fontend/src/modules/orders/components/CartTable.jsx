export default function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full table-fixed">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-3 py-3 text-sm font-semibold text-left text-purple-700">
              Product
            </th>

            <th className="w-24 px-2 py-3 text-sm font-semibold text-center text-purple-700">
              Qty
            </th>

            <th className="w-20 px-2 py-3 text-sm font-semibold text-center text-purple-700">
              Price
            </th>

            <th className="w-24 px-2 py-3 text-sm font-semibold text-center text-purple-700">
              Total
            </th>

            <th className="w-24 px-2 py-3 text-sm font-semibold text-center text-purple-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.Product_id}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-3 py-3 text-sm font-medium text-gray-700">
                <div className="truncate" title={item.Product_name}>
                  {item.Product_name}
                </div>
              </td>

              <td className="px-2 py-3">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onDecrease(item.Product_id)}
                    className="w-6 h-6 text-sm font-bold text-red-600 bg-red-100 rounded"
                  >
                    -
                  </button>

                  <span className="min-w-[20px] text-sm text-center font-semibold">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => onIncrease(item.Product_id)}
                    className="w-6 h-6 text-sm font-bold text-green-600 bg-green-100 rounded"
                  >
                    +
                  </button>
                </div>
              </td>

              <td className="px-2 py-3 text-sm text-center text-gray-700">
                ฿{item.Product_price}
              </td>

              <td className="px-2 py-3 text-sm font-semibold text-center text-purple-700">
                ฿{item.Product_price * item.qty}
              </td>

              <td className="px-2 py-3 text-center">
                <button
                  onClick={() => onRemove(item.Product_id)}
                  className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
