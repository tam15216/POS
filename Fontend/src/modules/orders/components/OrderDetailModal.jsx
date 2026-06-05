import { paymentMethodText } from "../../../shared/utils/paymentMethod";
export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden bg-white border border-purple-100 shadow-2xl rounded-3xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-purple-100 ">
          <div>
            <h2 className="text-3xl font-bold text-purple-700">รายละเอียดใบเสร็จ</h2>

            <p className="mt-1 text-sm text-gray-400">ข้อมูลการสั่งซื้อ</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 text-purple-700 transition bg-purple-100 rounded-full hover:bg-purple-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-8">
          <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50">
            <p className="mb-1 text-sm text-gray-500">เลขที่ใบเสร็จ</p>

            <p className="font-semibold text-gray-700">{order.sale.Bill_no}</p>
          </div>

          <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50">
            <p className="mb-1 text-sm text-gray-500">วิธีการชำระเงิน</p>

            <p className="font-semibold text-gray-700">
              {paymentMethodText[order.payment?.Payment_method] || "-"}
            </p>
          </div>

          <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50">
            <p className="mb-1 text-sm text-gray-500">สถานะ</p>

            <span
              className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold

            ${
              order.sale.Status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
            >
              {order.sale.Status}
            </span>
          </div>

          <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50">
            <p className="mb-1 text-sm text-gray-500">รวมทั้งหมด</p>

            <p className="text-xl font-bold text-purple-700">
              ฿{order.sale.Total_amount}
            </p>
          </div>
        </div>

        <div className="px-8 pb-6">
          <div className="overflow-hidden border border-purple-100 rounded-2xl">
            <table className="w-full">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-6 py-4 text-left text-purple-700">
                    สินค้า
                  </th>

                  <th className="px-6 py-4 text-center text-purple-700">จำนวน</th>

                  <th className="px-6 py-4 text-center text-purple-700">
                    ราคา/หน่วย
                  </th>

                  <th className="px-6 py-4 text-center text-purple-700">
                    รวมราคา
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item) => (
                  <tr
                    key={item.Sale_item_id}
                    className="border-t border-purple-50 hover:bg-purple-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {item.Product_name}
                    </td>

                    <td className="px-6 py-4 text-center">{item.Qty}</td>

                    <td className="px-6 py-4 text-center">
                      ฿{item.Unit_price}
                    </td>

                    <td className="px-6 py-4 font-semibold text-center text-purple-700">
                      ฿{item.Total_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end px-8 py-6 border-t border-purple-100 ">
          <button
            onClick={onClose}
            className="px-6 py-3 text-white transition bg-red-500 rounded-xl hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
