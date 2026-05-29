export default function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              Product
            </th>

            <th className="w-32 px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              Qty
            </th>

            <th className="w-40 px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              Price
            </th>

            <th className="w-40 px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              Total
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 w-52">
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
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {item.Product_name}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onDecrease(item.Product_id)}
                    className="w-8 h-8 font-bold text-red-600 transition bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    -
                  </button>

                  <span
                    className="
                        min-w-[30px]
                        text-center
                        font-semibold
                        text-gray-700
                      "
                  >
                    {item.qty}
                  </span>

                  <button
                    onClick={() => onIncrease(item.Product_id)}
                    className="w-8 h-8 font-bold text-green-600 transition bg-green-100 rounded-lg hover:bg-green-200"
                  >
                    +
                  </button>
                </div>
              </td>

              <td className="px-6 py-4 text-center text-gray-700 ">
                ฿{item.Product_price}
              </td>

              <td className="px-6 py-4 font-semibold text-center text-purple-700 ">
                ฿{item.Product_price * item.qty}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onRemove(item.Product_id)}
                  className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 shadow-sm rounded-xl hover:bg-red-600"
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
