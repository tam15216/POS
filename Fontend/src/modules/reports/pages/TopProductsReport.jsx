import useTopProductsReport from "../hooks/useTopProductsReport";
import ReportFilter from "../components/ReportFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

export default function TopProductsReport() {
  const { startDate, endDate, setStartDate, setEndDate, records, loading } =
    useTopProductsReport();

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(records, 10);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-purple-700">
            รายงานสินค้าขายดี
          </h1>
          <p className="text-gray-400">
            วิเคราะห์อันดับสินค้าที่ทำยอดขายและจำนวนชิ้นได้มากที่สุด
          </p>
        </div>
        <ReportFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] text-gray-400">
          กำลังดึงข้อมูลรายงาน...
        </div>
      ) : (
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm font-semibold text-purple-700 border-b border-purple-50">
                  <th className="pb-3 pl-2">อันดับ</th>
                  <th className="pb-3">รหัสสินค้า</th>
                  <th className="pb-3">ชื่อสินค้า</th>
                  <th className="pb-3">หมวดหมู่</th>
                  <th className="pb-3 text-right">ราคาต่อชิ้น</th>
                  <th className="pb-3 text-center">จำนวนที่ขายได้</th>
                  <th className="pb-3 pr-2 text-right">ยอดขายรวม</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-purple-50/50">
                {records.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-8 font-medium text-center text-gray-400"
                    >
                      ไม่พบข้อมูลรายงานในช่วงเวลาที่เลือก
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, index) => (
                    <tr
                      key={row.Product_id}
                      className="transition-colors hover:bg-purple-50/30"
                    >
                      <td className="py-3.5 pl-2 font-bold text-gray-400">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="py-3.5 font-mono text-sm text-gray-500">
                        {row.Product_code || `#${row.Product_id}`}
                      </td>
                      <td className="py-3.5 font-medium text-gray-700">
                        {row.Product_name}
                      </td>
                      <td className="py-3.5 text-sm text-gray-500">
                        {row.Category_name || "ทั่วไป"}
                      </td>
                      <td className="py-3.5 text-right font-mono">
                        ฿{Number(row.Product_price).toLocaleString()}
                      </td>
                      <td className="py-3.5 text-center font-semibold text-purple-600">
                        {Number(row.total_qty_sold)} ชิ้น
                      </td>
                      <td className="py-3.5 text-right pr-2 font-bold text-gray-700">
                        ฿{Number(row.total_revenue).toLocaleString()}
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
      )}
    </div>
  );
}
