import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ProductSearch from "../components/ProductSearch";
import EmptyState from "../components/EmptyState";
import { useState } from "react";

import useProducts from "../hooks/useProducts";

export default function Products() {
  const [open, setOpen] = useState(false);

  const {
    products,
    loading,
    addProduct,
    removeProduct,
    search,
    setSearch,
    filteredProducts,
    editProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (data) => {
    await addProduct(data);
    setOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Products</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <ProductSearch value={search} onChange={setSearch} />

          <button
            onClick={() => setOpen(true)}
            className="px-5 py-3 font-medium text-white transition bg-purple-500 shadow-md hover:bg-purple-600 rounded-xl"
          >
            + เพิ่มสินค้า
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-purple-100"></div>

      <div className="p-5 bg-white border border-purple-100 shadow-sm rounded-2xl">
        {loading ? (
          <div className="py-10 text-center text-gray-400">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductTable
            products={filteredProducts}
            onDelete={removeProduct}
            onEdit={handleEditProduct}
          />
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-purple-100 shadow-2xl rounded-2xl animate-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  {editingProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {editingProduct
                    ? "แก้ไขรายการสินค้า"
                    : "สร้างรายการสินค้าใหม่"}
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  setEditingProduct(null);
                }}
                className="font-bold text-purple-700 transition bg-purple-100 rounded-full w-9 h-9 hover:bg-purple-200"
              >
                ×
              </button>
            </div>

            <ProductForm
              initialData={editingProduct || {}}
              onSubmit={async (data) => {
                if (editingProduct) {
                  await editProduct(editingProduct.Product_id, data);

                  setEditingProduct(null);

                  setOpen(false);
                } else {
                  await handleAddProduct(data);
                }
              }}
              submitText={editingProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
