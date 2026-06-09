import useDashboard from "../hooks/useDashboard";
import DashboardCard from "../components/DashboardCard";
import LowStockAlert from "../components/LowStockAlert";
import TopSellingProducts from "../components/TopSellingProducts";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-purple-700">สรุปข้อมูล</h1>
        <p className="text-gray-400">ภาพรวมของข้อมูลธุรกิจ</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="ยอดขายวันนี้"
            value={`฿${dashboard.today_sales}`}
          />

          <DashboardCard
            title="ยอดขายเดือนนี้"
            value={`฿${dashboard.month_sales}`}
          />

          <DashboardCard title="ออเดอร์วันนี้" value={dashboard.today_orders} />

          <DashboardCard title="สินค้าทั้งหมด" value={dashboard.total_products} />

          <DashboardCard
            title="หมวดหมู่"
            value={dashboard.total_categories}
          />

          <DashboardCard title="สินค้าคงคลังต่ำ" value={dashboard.low_stock} />
        </div>

        <div className="grid items-stretch grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="flex xl:col-span-6">
            <LowStockAlert items={dashboard.low_stock_items || []} />
          </div>
          <div className="flex xl:col-span-6">
            <TopSellingProducts items={dashboard.top_selling_products || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
