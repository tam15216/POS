import { useState } from "react";
import useOrders from "../hooks/useOrders";
import OrdersTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";
import Searchbill from "../components/Searchbill";
import { getOrderDetail } from "../services/order.service";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";

export default function Orders() {
  const { orders, loading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchBill, setSearchBill] = useState("");

  const filteredOrders = orders.filter((order) => {
    if (!order.Bill_no) return false;
    return order.Bill_no.toLowerCase().includes(
      searchBill.toLowerCase().trim(),
    );
  });

  const ordersPagination = usePagination(filteredOrders, 10);

  const handleSearchChange = (e) => {
    setSearchBill(e.target.value);
    ordersPagination.setCurrentPage(1);
  };

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">ประวัติการขาย</h1>
          <p className="mt-1 text-gray-400">ดูธุรกรรมการขายทั้งหมด</p>
        </div>

        <Searchbill value={searchBill} onChange={handleSearchChange} />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <OrdersTable
          orders={ordersPagination.paginatedData}
          onView={handleView}
        />
      )}

      {filteredOrders.length > 0 && (
        <Pagination
          currentPage={ordersPagination.currentPage}
          totalPages={ordersPagination.totalPages}
          onPageChange={ordersPagination.setCurrentPage}
        />
      )}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
