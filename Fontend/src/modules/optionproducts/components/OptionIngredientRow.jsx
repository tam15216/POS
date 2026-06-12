export default function OptionIngredientRow({
  row,
  index,
  ingredientsStore,
  onChange,
  onRemove,
}) {
  return (
    <div className="flex items-center gap-3 p-2 border border-gray-100 bg-gray-50 rounded-xl">
      <div className="flex-1">
        <select
          value={row.ingredient_id}
          onChange={(e) => onChange(index, "ingredient_id", e.target.value)}
          className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
        >
          <option value="">-- เลือกวัตถุดิบ --</option>
          {ingredientsStore.map((ing) => (
            <option key={ing.Ingredient_id} value={ing.Ingredient_id}>
              {ing.Ingredient_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5 w-32 px-2 py-1 bg-white border border-gray-200 rounded-lg">
        <input
          type="number"
          value={row.quantity_used}
          onChange={(e) =>
            onChange(index, "quantity_used", Number(e.target.value))
          }
          className="w-full font-mono text-xs text-center focus:outline-none"
          min="0.01"
          step="any"
        />
        <span className="text-[10px] text-gray-400 font-medium">หน่วย</span>
      </div>

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
