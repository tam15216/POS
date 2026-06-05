import { useState } from "react";

import useOrders from "../hooks/useOrders";

import OrdersTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";

import { getOrderDetail } from "../services/order.service";
import Pagination from "../../../shared/components/Pagination";

export default function Orders() {
  const { orders, loading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
    <div>
      <h1>Order History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrdersTable orders={currentOrders} onView={handleView} />
      )}
      {orders.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
