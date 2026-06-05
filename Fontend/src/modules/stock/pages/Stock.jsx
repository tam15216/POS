import useStock from "../hooks/useStock";
import { useEffect, useState } from "react";
import StockHistoryTable from "../components/StockHistoryTable";
import StockForm from "../components/StockForm";
import StockTable from "../components/StockTable";
import useProducts from "../../products/hooks/useProducts";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";

export default function Stock() {
  const { stocks, history, loading, addStock, removeStock } = useStock();
  const { productsnotall } = useProducts();
  const [openIn, setOpenIn] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const historyPagination = usePagination(history, 10);
  const stockPagination = usePagination(stocks, 10);

  const productsAvailableInStock = productsnotall.filter((product) => {
    const stockInfo = stocks.find(
      (item) => item.Product_id === product.Product_id,
    );
    const currentQty = stockInfo?.Qty || 0;
    return currentQty > 0;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            จัดการสต๊อกสินค้า
          </h1>

          <p className="mt-1 text-gray-400">จัดการสต๊อกเข้าและสต๊อกออก</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenIn(true)}
            className="px-5 py-3 font-medium text-white transition bg-green-500 shadow-md rounded-xl hover:bg-green-600"
          >
            + Stock IN
          </button>

          <button
            onClick={() => setOpenOut(true)}
            className="px-5 py-3 font-medium text-white transition bg-red-500 shadow-md rounded-xl hover:bg-red-600"
          >
            - Stock OUT
          </button>
        </div>
      </div>

      <div className="p-5 mb-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <h3 className="mb-4 text-xl font-bold text-purple-700">
          สต๊อกปัจจุบัน
        </h3>

        {loading ? (
          <div className="py-10 text-center text-gray-400">Loading...</div>
        ) : (
          <StockTable stocks={stockPagination.paginatedData} />
        )}
        <Pagination
          currentPage={stockPagination.currentPage}
          totalPages={stockPagination.totalPages}
          onPageChange={stockPagination.setCurrentPage}
        />
      </div>

      <div className="p-5 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <h3 className="mb-4 text-xl font-bold text-purple-700">ประวัติสต๊อก</h3>

        <StockHistoryTable history={historyPagination.paginatedData} />
        <Pagination
          currentPage={historyPagination.currentPage}
          totalPages={historyPagination.totalPages}
          onPageChange={historyPagination.setCurrentPage}
        />
      </div>

      {openIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-purple-100 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-green-600">
                  เพิ่มสต๊อก
                </h2>

                <p className="mt-1 text-sm text-gray-400">เพิ่มจำนวนสต๊อก</p>
              </div>

              <button
                onClick={() => setOpenIn(false)}
                className="font-bold text-green-700 transition bg-green-100 rounded-full w-9 h-9 hover:bg-green-200"
              >
                ×
              </button>
            </div>

            <StockForm
              products={productsnotall}
              onSubmit={addStock}
              submitText={"เพิ่มสต๊อก"}
            />
          </div>
        </div>
      )}

      {openOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-purple-100 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-red-600">ลดสต๊อก</h2>

                <p className="mt-1 text-sm text-gray-400">ลดจำนวนสต๊อก</p>
              </div>

              <button
                onClick={() => setOpenOut(false)}
                className="font-bold text-red-700 transition bg-red-100 rounded-full w-9 h-9 hover:bg-red-200"
              >
                ×
              </button>
            </div>

            <StockForm
              products={productsAvailableInStock}
              onSubmit={removeStock}
              submitText={"ลดสต๊อก"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
