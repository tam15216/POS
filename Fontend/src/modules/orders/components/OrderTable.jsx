export default function OrderTable({ orders, onView }) {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-2xl">
      <table className="w-full">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              Sale ID
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              Bill No
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              วันที่ - เวลา
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              ยอดรวม
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              สถานะ
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              ผู้ทำรายการ
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              เพิ่มเติม
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr
              key={item.Sale_id}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-6 py-4 text-gray-700">#{item.Sale_id}</td>

              <td className="px-6 py-4 font-medium text-gray-700">
                {item.Bill_no}
              </td>

              <td className="px-6 py-4 text-gray-500">{new Date(item.Created_at).toLocaleString("th-TH")}</td>

              <td className="px-6 py-4 font-semibold text-center text-purple-700">
                ฿{item.Total_amount}
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold

                  ${
                    item.Status === "paid"
                      ? "bg-green-100 text-green-700"
                      : item.Status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {item.Status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">{item.seller_name || "ไม่ระบุ"}</td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onView(item)}
                  className="px-4 py-2 text-sm font-medium text-white transition bg-purple-500 rounded-xl hover:bg-purple-600"
                >
                  เพิ่มเติม
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
