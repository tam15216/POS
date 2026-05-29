import { useState } from "react";
import { validateStockForm }from "../validations/stock.validation";

export default function StockForm({ products = [], onSubmit, submitText }) {
  const [form, setForm] = useState({
    product_id: "",
    qty: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateStockForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onSubmit(form);

    setForm({
      product_id: "",
      qty: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 space-y-5 bg-white border border-purple-100 shadow-sm rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-purple-700">{submitText}</h2>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700 ">
          สินค้า
        </label>

        <select
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        >
          <option value="">เลือกสินค้า</option>

          {products.map((item) => (
            <option key={item.Product_id} value={item.Product_id}>
              {item.Product_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700 ">
          จำนวน
        </label>

        <input
          type="number"
          name="qty"
          value={form.qty}
          onChange={handleChange}
          placeholder="จำนวน"
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
      </div>

      {error && (
        <div className="px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
      >
        {submitText}
      </button>
    </form>
  );
}
