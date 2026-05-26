export default function CategoryTable({ categories, onDelete }) {
  return (
    <div className="overflow-hidden border border-purple-100 rounded-2xl">
      <table className="w-full">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-left text-purple-700 ">
              ชื่อหมวดหมู่
            </th>

            <th className="w-32 px-6 py-4 text-sm font-semibold text-center text-purple-700 ">
              จัดการ
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {categories.map((item) => (
            <tr
              key={item.Category_id}
              className="transition border-t border-purple-50 hover:bg-purple-50"
            >
              <td className="px-6 py-4 font-medium text-gray-700 ">
                {item.Category_name}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(item.Category_id)}
                  className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 shadow-sm rounded-xl hover:bg-red-600"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
