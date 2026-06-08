export default function DashboardCard({ title, value }) {
  return (
    <div className="p-6 transition bg-white border border-purple-100 shadow-sm rounded-2xl hover:shadow-md">
      <p className="mb-2 text-sm font-medium text-gray-500 ">{title}</p>

      <h2 className="text-3xl font-bold text-purple-700 ">{value}</h2>
    </div>
  );
}
