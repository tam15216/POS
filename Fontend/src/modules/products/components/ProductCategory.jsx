export default function ProductCategory({
  value,
  onChange,
  categories
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map((item) => (
        <option
          key={item.Category_id}
          value={item.Category_id}
        >
          {item.Category_name}
        </option>
      ))}
    </select>
  );
}