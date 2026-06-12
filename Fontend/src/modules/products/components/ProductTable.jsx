import ConfirmButton from "../../../shared/components/ConfirmButton";
import StatusToggleButton from "../../../shared/components/StatusToggleButton";
export default function ProductTable({ products, onToggle, onEdit }) {
  return (
    <table className="w-full overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl">
      <thead className="text-white bg-purple-500">
        <tr>
          {/* <th className="px-6 py-4 text-left">ID</th> */}
          <th className="px-6 py-4 text-left">ชื่อสินค้า</th>
          <th className="px-6 py-4 text-left">หมวดหมู่</th>
          <th className="px-6 py-4 text-left">ราคา</th>
          <th className="px-6 py-4 text-center"> จัดการ</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.Product_id} className="border-b hover:bg-gray-50">
            {/* <td className="px-6 py-4">{item.Product_id}</td> */}

            <td className="px-6 py-4 font-medium">{item.Product_name}</td>

            <td className="px-6 py-4 font-medium">{item.Category_name}</td>

            <td className="px-6 py-4">{item.Product_price} ฿</td>

            <td className="px-6 py-4 text-center">
              <ConfirmButton
                title={item.status ? "ปิดใช้งานสินค้า" : "เปิดใช้งานสินค้า"}
                text={`ต้องการ ${item.status ? "ปิด" : "เปิด"} ใช้งานสินค้าหรือไม่`}
                icon="warning"
                onConfirm={() => onToggle(item.Product_id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  item.status === 1 || item.status === true
                    ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                    : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {item.status === 1 || item.status === true
                  ? "ปิดสถานะ"
                  : "เปิดสถานะ"}
              </ConfirmButton>

              {/* 💡 ปุ่มแก้ไข: เปลี่ยนเป็นสีฟ้าจาง (Subtle Blue) ขนาดเท่ากัน */}
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors"
              >
                แก้ไข
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
