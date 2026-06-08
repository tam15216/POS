import useStockMovementReport from "../hooks/useStockMovementReport"; // นำเข้า hook ใหม่
import ReportFilter from "../components/ReportFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

const refTypeMovements = {
  sale: "ขายสินค้า",
  import: "รับสินค้าเข้า",
  adjust: "ปรับปรุงสต๊อกมือ",
};

export default function StockMovementReport() {
  const { startDate, endDate, setStartDate, setEndDate, records, loading } =
    useStockMovementReport();

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(records, 10);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-purple-700">
            รายงานเคลื่อนไหวสต๊อก
          </h1>
          <p className="text-gray-400">
            ตรวจสอบประวัติการอัปเดตสต๊อกสินค้าเข้าและออกคลังอย่างละเอียด
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
                  <th className="pb-3 pl-2">วันที่-เวลา</th>
                  <th className="pb-3">รหัสสินค้า</th>
                  <th className="pb-3">ชื่อสินค้า</th>
                  <th className="pb-3">ประเภทกิจกรรม</th>
                  <th className="pb-3 text-center">จำนวนการเปลี่ยนแปลง</th>
                  <th className="pb-3 pr-2 text-right">อ้างอิงเอกสาร ID</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-purple-50/50">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">
                      ไม่พบข้อมูลรายงานในช่วงเวลาที่เลือก
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row) => (
                    <tr
                      key={row.Stock_log_id}
                      className="transition-colors hover:bg-purple-50/30"
                    >
                      <td className="py-3.5 pl-2 text-sm">
                        {new Date(row.Created_at).toLocaleString("th-TH")}
                      </td>
                      <td className="py-3.5 font-mono text-sm text-purple-600 font-semibold">
                        {row.Product_code || `#${row.Product_id}`}
                      </td>
                      <td className="py-3.5 font-medium text-gray-700">
                        {row.Product_name}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                            row.Ref_type === "sale"
                              ? "text-red-700 bg-red-50"
                              : row.Ref_type === "import"
                                ? "text-green-700 bg-green-50"
                                : "text-amber-700 bg-amber-50"
                          }`}
                        >
                          {refTypeMovements[row.Ref_type] || row.Ref_type}
                        </span>
                      </td>
                      <td
                        className={`py-3.5 text-center font-bold font-mono ${row.Qty_change < 0 ? "text-red-500" : "text-green-500"}`}
                      >
                        {row.Qty_change > 0
                          ? `+${row.Qty_change}`
                          : row.Qty_change}{" "}
                        ชิ้น
                      </td>
                      <td className="py-3.5 text-right pr-2 text-sm text-gray-400 font-mono">
                        {row.Ref_id ? `ID: ${row.Ref_id}` : "-"}
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
