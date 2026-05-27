export default function UserTable({ users, onToggle }) {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-purple-100 bg-purple-50">
        <div>
          <h2 className="text-xl font-bold text-purple-700">
            รายชื่อผู้ใช้งาน
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            จัดการสถานะและสิทธิ์ของผู้ใช้งานในระบบ
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-50">
            <tr className="text-sm text-left text-purple-700">
              <th className="px-6 py-4 font-semibold">ID</th>

              <th className="px-6 py-4 font-semibold">Username</th>

              <th className="px-6 py-4 font-semibold">ชื่อผู้ใช้งาน</th>

              <th className="px-6 py-4 font-semibold">Role</th>

              <th className="px-6 py-4 font-semibold">Status</th>

              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-gray-400"
                >
                  ยังไม่มีข้อมูลผู้ใช้งาน
                </td>
              </tr>
            ) : (
              users.map((item) => (
                <tr
                  key={item.User_id}
                  className="transition border-t border-purple-50 hover:bg-purple-50/40"
                >
                  {/* ID */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{item.User_id}
                  </td>

                  {/* Username */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-700">
                      {item.Username}
                    </div>
                  </td>

                  {/* Full Name */}
                  <td className="px-6 py-4 text-gray-600">{item.Full_name}</td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          
                          ${
                            item.Role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                    >
                      {item.Role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                          px-3 py-1 rounded-full text-xs font-medium

                          ${
                            item.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onToggle(item.User_id)}
                      className={`
                          px-4 py-2 text-sm font-medium text-white rounded-xl transition

                          ${
                            item.is_active
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }
                        `}
                    >
                      {item.is_active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
