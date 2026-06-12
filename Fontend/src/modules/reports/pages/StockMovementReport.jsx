import useStockMovementReport from "../hooks/useStockMovementReport";
import ReportFilter from "../components/ReportFilter";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

const refTypeMovements = {
  sale: "ขายสินค้า",
  import: "รับสินค้าเข้า",
  restock: "รับวัตถุดิบเข้าคลัง", 
  adjust: "ปรับปรุงยอดสต๊อก",
  cancel: "ยกเลิกการขาย",
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
            ตรวจสอบประวัติการอัปเดตคลังสินค้าและวัตถุดิบดิบเข้าและออกอย่างละเอียด
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
                  <th className="pb-3">ประเภทคลัง</th>{" "}
                  <th className="pb-3">รหัสรายการ</th>
                  <th className="pb-3">ชื่อรายการ</th>
                  <th className="pb-3">กิจกรรม</th>
                  <th className="pb-3 text-center">จำนวนที่เปลี่ยน</th>
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
                      key={`${row.item_type}-${row.log_id}`}
                      className="transition-colors hover:bg-purple-50/30"
                    >
                      <td className="py-3.5 pl-2 text-sm">
                        {new Date(row.created_at).toLocaleString("th-TH")}
                      </td>

                      <td className="py-3.5 text-sm">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                            row.item_type === "product"
                              ? "text-blue-700 bg-blue-50 border border-blue-100"
                              : "text-purple-700 bg-purple-50 border border-purple-100"
                          }`}
                        >
                          {row.item_type === "product"
                            ? "สินค้าสำเร็จ"
                            : "วัตถุดิบ"}
                        </span>
                      </td>

                      <td className="py-3.5 font-mono text-sm text-purple-600 font-semibold">
                        {row.item_code && row.item_code !== "-"
                          ? row.item_code
                          : `#${row.item_id}`}
                      </td>

                      <td className="py-3.5 font-medium text-gray-700">
                        {row.item_name}
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                            row.ref_type === "sale"
                              ? "text-red-700 bg-red-50"
                              : row.ref_type === "import" ||
                                  row.ref_type === "restock"
                                ? "text-green-700 bg-green-50"
                                : "text-amber-700 bg-amber-50"
                          }`}
                        >
                          {refTypeMovements[row.ref_type] || row.ref_type}
                        </span>
                      </td>

                      <td
                        className={`py-3.5 text-center font-bold font-mono ${Number(row.qty_change) < 0 ? "text-red-500" : "text-green-500"}`}
                      >
                        {Number(row.qty_change) > 0
                          ? `+${Number(row.qty_change).toLocaleString()}`
                          : Number(row.qty_change).toLocaleString()}{" "}
                        {row.unit}{" "}
                      </td>

                      <td className="py-3.5 text-right pr-2 text-sm text-gray-400 font-mono">
                        {row.bill_no
                          ? `${row.bill_no}`
                          : row.ref_id && row.ref_id !== 0
                            ? `#${row.ref_id}`
                            : "-"}
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
