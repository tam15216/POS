export default function ReportSummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <p className="mb-1 text-sm font-medium text-gray-400">ออเดอร์ทั้งหมด</p>
        <p className="text-3xl font-bold text-gray-700">
          {summary?.total_orders || 0} <span className="text-sm font-normal text-gray-400">บิล</span>
        </p>
      </div>
      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <p className="mb-1 text-sm font-medium text-gray-400">กำไรสุทธิ</p>
        <p className="text-3xl font-bold text-amber-600">
          ฿{Number(summary?.total_profit_amount || 0).toLocaleString()}
        </p>
      </div>
      <div className="p-6 text-white bg-purple-700 shadow-sm rounded-2xl">
        <p className="mb-1 text-sm font-medium opacity-80">รายได้สุทธิรวม</p>
        <p className="text-3xl font-bold">
          ฿{Number(summary?.total_sales_amount || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}