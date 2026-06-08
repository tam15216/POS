import useDashboard from "../hooks/useDashboard";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading || !dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-purple-700 ">สรุปข้อมูล</h1>

        <p className="text-gray-400">ภาพรวมของข้อมูลธุรกิจ</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Sales Today"
          value={`฿${dashboard.today_sales}`}
        />

        <DashboardCard
          title="Sales Month"
          value={`฿${dashboard.month_sales}`}
        />

        <DashboardCard
          title={<>Orders Today</>}
          value={dashboard.today_orders}
        />

        <DashboardCard title="Products" value={dashboard.total_products} />

        <DashboardCard title="Categories" value={dashboard.total_categories} />

        <DashboardCard title="Low Stock" value={dashboard.low_stock} />
      </div>
    </div>
  );
}
