export default function ProductSearch({ value, onChange }) {
  return (
   <input
    type="text"
    placeholder="ค้าหาสินค้า..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-3 text-gray-700 placeholder-gray-400 transition bg-white border border-purple-200 shadow-sm outline-none w-72 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
/>
  );
}
