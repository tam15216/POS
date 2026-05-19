import { useState } from "react";
import useCategories from "../hooks/useCategories";
export default function ProductForm({ onSubmit }) {
  const [form, setform] = useState({
    name: "",
    price: "",
    category_id: "",
  });

  const { categories , loading } = useCategories();

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FORM DATA =", form);
    onSubmit(form);

    setform({
      name: "",
      price: "",
      category_id: "",
    });
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          Price
        </label>

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          Category
        </label>

        <select
          name="category_id"
          value={form.category_id}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
        >
          <option value="">Select category</option>

          {categories.map((item) => (
            <option key={item.Category_id} value={item.Category_id}>
              {item.Category_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
      >
        Add Product
      </button>
    </form>
  );
}
