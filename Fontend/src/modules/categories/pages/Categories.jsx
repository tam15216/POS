import CategoryTable from "../components/CategotyTable";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";
import useCategories from "../hooks/useCategories";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

export default function Categories() {
  const { loading, addCategory, toggleCategorys , categories } = useCategories();
  const [open, setOpen] = useState(false);
  const categoriespagination = usePagination(categories, 9);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Categories</h1>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-3 font-medium text-white transition bg-purple-500 shadow-md hover:bg-purple-600 rounded-xl"
        >
          + เพิ่มหมวดหมู่
        </button>
      </div>

      <div className="mb-6 border-b border-purple-100"></div>

      <div className="p-5 bg-white border border-purple-100 shadow-sm rounded-2xl">
        {loading ? (
          <div className="py-10 text-center text-gray-400">Loading...</div>
        ) : (
          <CategoryTable categories={categories} onDelete={toggleCategorys} />
        )}
        <Pagination
          currentPage={categoriespagination.currentPage}
          totalPages={categoriespagination.totalPages}
          onPageChange={categoriespagination.setCurrentPage}
        />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-purple-100 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  เพิ่มหมวดหมู่
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  สร้างหมวดหมู่สินค้าใหม่
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="font-bold text-purple-700 transition bg-purple-100 rounded-full w-9 h-9 hover:bg-purple-200"
              >
                ×
              </button>
            </div>

            <CategoryForm
              onSubmit={async (data) => {
                await addCategory(data);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
