import useSalesReport from "../hooks/useSalesReport";
import ReportFilter from "../components/ReportFilter";
import ReportSummaryCards from "../components/ReportSummaryCards";
import ReportTable from "../components/ReportTable";

export default function SalesReport() {
  const { startDate, endDate, setStartDate, setEndDate, reportData, loading } =
    useSalesReport();

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-purple-700">
            รายงานยอดขาย
          </h1>
          <p className="text-gray-400">
            ตรวจสอบและวิเคราะห์ประวัติการขายตามช่วงเวลา
          </p>
        </div>

        <ReportFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {loading || !reportData ? (
        <div className="flex items-center justify-center min-h-[300px] text-gray-400">
          กำลังประมวลผลรายงาน...
        </div>
      ) : (
        <>
          <ReportSummaryCards summary={reportData.summary} />

          <ReportTable records={reportData.records} />
        </>
      )}
    </div>
  );
}
