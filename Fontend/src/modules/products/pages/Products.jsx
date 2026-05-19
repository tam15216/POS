import { data } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { useState } from "react";

import useProducts from "../hooks/useProducts";

export default function Products() {
  const [open, setOpen] = useState(false);

  const { products, loading, addProduct, removeProduct } = useProducts();

  const handleAddProduct = async (data) => {
    await addProduct(data);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Products</h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-3 font-medium text-white transition bg-purple-500 shadow-md hover:bg-purple-600 rounded-xl"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-6 border-b border-purple-100"></div>

      <div className="p-5 bg-white border border-purple-100 shadow-sm rounded-2xl">
        {loading ? (
          <div className="py-10 text-center text-gray-400">Loading...</div>
        ) : (
          <ProductTable products={products} onDelete={removeProduct} />
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-purple-100 shadow-2xl rounded-2xl animate-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  Add Product
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Create new product item
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="font-bold text-purple-700 transition bg-purple-100 rounded-full w-9 h-9 hover:bg-purple-200"
              >
                ×
              </button>
            </div>

            <ProductForm onSubmit={handleAddProduct} />
          </div>
        </div>
      )}
    </div>
  );
}
