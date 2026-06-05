import { paymentMethodText } from "../../../shared/utils/paymentMethod";

export default function PaymentSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 text-gray-700 bg-white border border-purple-200 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
    >
      {Object.entries(paymentMethodText).map(([key, text]) => (
        <option key={key} value={key}>
          {text}
        </option>
      ))}
    </select>
  );
}