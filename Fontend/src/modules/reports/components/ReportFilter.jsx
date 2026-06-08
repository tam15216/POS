export default function ReportFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex flex-col">
        <span className="mb-1 text-xs font-medium text-gray-400">วันที่เริ่มต้น</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="text-sm font-semibold text-gray-700 outline-none border-b border-purple-200 focus:border-purple-500 pb-0.5 bg-transparent"
        />
      </div>
      <span className="mt-4 text-gray-300">至</span>
      <div className="flex flex-col">
        <span className="mb-1 text-xs font-medium text-gray-400">วันที่สิ้นสุด</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="text-sm font-semibold text-gray-700 outline-none border-b border-purple-200 focus:border-purple-500 pb-0.5 bg-transparent"
        />
      </div>
    </div>
  );
}