// src/modules/reports/components/ReportTable.jsx
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";
import { paymentMethodText } from "../../../shared/utils/paymentMethod";

export default function ReportTable({ records = [] }) {
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(records, 9);

  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
      <h3 className="mb-4 text-xl font-bold text-gray-700">ประวัติรายการบิลในช่วงเวลา</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-semibold text-purple-700 border-b border-purple-50">
              <th className="pb-3 pl-2">เลขที่บิล</th>
              <th className="pb-3">วันที่-เวลา</th>
              <th className="pb-3">ช่องทางชำระเงิน</th>
              <th className="pb-3 text-right">ยอดรวมก่อนลด</th>
              <th className="pb-3 text-right">ส่วนลด</th>
              <th className="pb-3 text-right">ยอดสุทธิ</th>
              <th className="pb-3 pr-2 text-center">สถานะ</th>
              <th className="pb-3">พนักงานขาย</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-purple-50/50">
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 font-medium text-center text-gray-400">
                  ไม่พบข้อมูลการขายในช่วงเวลาที่เลือก
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.Sale_id} className="transition-colors hover:bg-purple-50/30">
                  <td className="py-3.5 pl-2 font-mono text-sm text-purple-600 font-semibold">
                    {row.Bill_no}
                  </td>
                  <td className="py-3.5 text-sm">
                    {new Date(row.Sale_datetime).toLocaleString('th-TH')}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 rounded text-gray-600">
                      {paymentMethodText[row.Payment_method] || row.Payment_method || 'ไม่ระบุ'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-mono text-sm">
                    ฿{Number(row.Total_amount).toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right font-mono text-sm text-amber-600">
                    ฿{Number(row.Discount_amount).toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right font-mono text-sm font-bold text-gray-700">
                    ฿{Number(row.Net_amount).toLocaleString()}
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${
                      row.Status === 'paid' 
                        ? 'text-green-700 bg-green-50' 
                        : 'text-red-700 bg-red-50'
                    }`}>
                      {row.Status === 'paid' ? 'สำเร็จ' : 'ยกเลิก'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2">
                    {row.seller_name || 'ไม่ระบุ'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {records.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}