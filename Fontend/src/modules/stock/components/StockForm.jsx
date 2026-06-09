import { useState } from "react";
import { validateStockForm } from "../validations/stock.validation";

export default function StockForm({ products = [], onSubmit, submitText }) {
  const [form, setForm] = useState({
    product_id: "",
    qty: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 
  const [error, setError] = useState("");

  const filteredProducts = products.filter(
    (item) =>
      item.Product_name?.toLowerCase().includes(
        searchTerm.toLowerCase().trim(),
      ) ||
      item.Product_code?.toLowerCase().includes(
        searchTerm.toLowerCase().trim(),
      ),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateStockForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onSubmit(form);

    setForm({ product_id: "", qty: "" });
    setSearchTerm(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 space-y-5 bg-white border border-purple-100 shadow-sm rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-purple-700">{submitText}</h2>

      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-purple-700">
          สินค้า
        </label>

        <input
          type="text"
          placeholder="พิมพ์เพื่อค้นหาพิกัดสินค้า..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-purple-100 shadow-lg max-h-60 rounded-xl">
            {filteredProducts.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400">ไม่พบสินค้า</div>
            ) : (
              filteredProducts.map((item) => (
                <button
                  key={item.Product_id}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, product_id: item.Product_id });
                    setSearchTerm(item.Product_name); 
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-purple-50 ${
                    form.product_id === item.Product_id
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item.Product_name}{" "}
                  {item.Product_code ? `(${item.Product_code})` : ""}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          จำนวน
        </label>
        <input
          type="number"
          name="qty"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
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
