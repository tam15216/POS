import { useState } from "react";
import { paymentMethodText } from "../../../shared/utils/paymentMethod";
import { cancelOrder } from "../services/order.service";
// 1. อิมพอร์ต ConfirmButton เข้ามาใช้งาน (ปรับ path ให้ตรงกับที่เก็บไฟล์ของคุณ)
import ConfirmButton from "../../../shared/components/ConfirmButton";

export default function OrderDetailModal({ order, onClose, onCancelSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) return null;

  const executeCancel = async () => {
    try {
      setIsSubmitting(true);
      await cancelOrder(order.sale.Sale_id);

      alert("ยกเลิกออเดอร์และคืนสต๊อกสินค้าเรียบร้อยแล้ว");

      if (onCancelSuccess) {
        onCancelSuccess();
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "ไม่สามารถยกเลิกออเดอร์ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden bg-white border border-purple-100 shadow-2xl rounded-3xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-purple-100 ">
          <div>
            <h2 className="text-3xl font-bold text-purple-700">
              รายละเอียดใบเสร็จ
            </h2>
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
              className={`px-3 py-1 rounded-full text-xs font-semibold ${order.sale.Status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {order.sale.Status === "paid" ? "ชำระเงินแล้ว" : "ยกเลิกแล้ว"}
            </span>
          </div>
          <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50">
            <p className="mb-1 text-sm text-gray-500">รวมทั้งหมด</p>
            <p className="text-xl font-bold text-purple-700">
              ฿{Number(order.sale.Total_amount).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="px-8 pb-6">
          <div className="overflow-hidden border border-purple-100 rounded-2xl">
            <div className="overflow-y-auto max-h-80">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-purple-100 shadow-[0_1px_0_0_rgba(243,232,255,1)]">
                  <tr>
                    <th className="px-6 py-4 text-purple-700">สินค้า</th>
                    <th className="px-6 py-4 text-center text-purple-700">
                      จำนวน
                    </th>
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
                        ฿{Number(item.Unit_price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-center text-purple-700">
                        ฿{Number(item.Total_price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-8 py-6 border-t border-purple-100">
          <div>
            {order.sale.Status === "paid" && (
              <ConfirmButton
                title="ยืนยันการยกเลิก"
                text={`คุณต้องการยกเลิกใบเสร็จเลขที่ ${order.sale.Bill_no} ใช่หรือไม่?`}
                icon="warning"
                onConfirm={executeCancel}
                className="px-6 py-3 font-semibold text-white transition bg-red-500 rounded-xl hover:bg-red-600 disabled:bg-gray-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "กำลังยกเลิก..." : "ยกเลิกบิลนี้"}
              </ConfirmButton>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 font-semibold text-purple-700 transition border border-purple-200 hover:bg-purple-50 rounded-xl"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
