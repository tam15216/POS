import { useEffect, useState } from "react";
import useCategories from "../../categories/hooks/useCategories";
import { validateProduct } from "../validations/product.schema";
import { confirmProductAction } from "../../../shared/utils/confirm";
import ProductCategory from "../components/ProductCategory";

export default function ProductForm({
  onSubmit,
  initialData = {},
  submitText = "เพิ่มสินค้าใหม่",
}) {
  const [form, setform] = useState({
    name: "",
    cost_price: "",
    price: "",
    category_id: "",
    product_type: "ready_made",
  });

  const { categories_notall, loading } = useCategories();
  const [errors, setError] = useState({});

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setform({
      ...form,
      category_id: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(form);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const isEdit = !!initialData.Product_id;
    const result = await confirmProductAction(isEdit);
    if (!result.isConfirmed) return;

    onSubmit(form);
  };

  useEffect(() => {
    setform({
      name: initialData.Product_name || "",
      cost_price: initialData.Cost_price || "",
      price: initialData.Product_price || "",
      category_id: initialData.Category_id || "",
      product_type: initialData.Product_type || "ready_made",
    });
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          ชื่อสินค้า
        </label>
        <input
          type="text"
          name="name"
          placeholder="ชื่อสินค้า"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          ประเภทสินค้า
        </label>
        <select
          name="product_type"
          value={form.product_type}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          required
        >
          <option value="ready_made">สินค้าสำเร็จรูป (นับสต๊อกเป็นชิ้น)</option>
          <option value="made_to_order">
            สินค้าสั่งทำ/น้ำชง (หักตามสูตรวัตถุดิบ)
          </option>
        </select>
        {errors.product_type && (
          <p className="mt-1 text-sm text-red-500">{errors.product_type}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          ราคาต้นทุน
        </label>
        <input
          type="number"
          name="cost_price"
          placeholder="ราคาต้นทุน"
          value={form.cost_price}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
        {errors.cost_price && (
          <p className="mt-1 text-sm text-red-500">{errors.cost_price}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          ราคาขาย
        </label>
        <input
          type="number"
          name="price"
          placeholder="ราคาขาย"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-purple-700">
          หมวดหมู่
        </label>
        <ProductCategory
          value={form.category_id}
          onChange={handleCategoryChange}
          categories={categories_notall}
        />
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
      >
        {submitText}
      </button>
    </form>
  );
}
