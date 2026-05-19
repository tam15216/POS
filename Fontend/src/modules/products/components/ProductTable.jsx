import ConfirmButton from "../../../shared/components/ConfirmButton";
export default function ProductTable({ products, onDelete }) {
  return (
    <table className="w-full overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl">
      <thead className="text-white bg-purple-500">
        <tr>
          <th className="px-6 py-4 text-left">ID</th>
          <th className="px-6 py-4 text-left">Name</th>
          <th className="px-6 py-4 text-left">Category</th>
          <th className="px-6 py-4 text-left">Price</th>
          <th className="px-6 py-4 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.Product_id} className="border-b hover:bg-gray-50">
            <td className="px-6 py-4">{item.Product_id}</td>

            <td className="px-6 py-4 font-medium">{item.Product_name}</td>

            <td className="px-6 py-4 font-medium">{item.Category_name}</td>

            <td className="px-6 py-4">{item.Product_price} ฿</td>

            <td className="px-6 py-4 text-center">
              <ConfirmButton
                title="Delete Product?"
                text="This action cannot be undone"
                icon="warning"
                onConfirm={() => onDelete(item.Product_id)}
                className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 rounded-xl hover:bg-red-600"
              >
                Delete
              </ConfirmButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
