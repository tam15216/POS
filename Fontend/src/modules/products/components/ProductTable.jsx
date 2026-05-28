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
              >
                <StatusToggleButton isActive={item.status} />
              </ConfirmButton>

              <button
                onClick={() => onEdit(item)}
                className="px-4 py-2 ml-2 text-sm font-medium text-white transition bg-blue-500 rounded-xl hover:bg-blue-600"
              >
                เเก้ไข
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
