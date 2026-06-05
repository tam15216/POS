export default function PaymentSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 text-gray-700 bg-white border border-purple-200 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
    >
      <option value="cash">Cash</option>
      <option value="transfer">Transfer</option>
      <option value="credit_card">Credit Card</option>
    </select>
  );
}
