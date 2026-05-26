export default function ProductCategory({ value, onChange, categories }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-gray-700 transition bg-white border border-purple-200 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
    >
      <option value="">Select Category</option>

      {categories.map((item) => (
        <option key={item.Category_id} value={item.Category_id}>
          {item.Category_name}
        </option>
      ))}
    </select>
  );
}
