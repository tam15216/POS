import { useState } from "react";

import useOrders from "../hooks/useOrders";

import OrdersTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";

import { getOrderDetail } from "../services/order.service";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";

export default function Orders() {
  const { orders, loading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPagination = usePagination(orders, 10);

  const handleView = async (order) => {
    try {
      const data = await getOrderDetail(order.Sale_id);

      setSelectedOrder(data);
    } catch (err) {
      console.error(err);
      alert("Load order detail failed");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-700">ประวัติการขาย</h1>

        <p className="mt-1 text-gray-400">ดูธุรกรรมการขายทั้งหมด</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrdersTable orders={ordersPagination.paginatedData} onView={handleView} />
      )}
      <Pagination
        currentPage={ordersPagination.currentPage}
        totalPages={ordersPagination.totalPages}
        onPageChange={ordersPagination.setCurrentPage}
      />
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
