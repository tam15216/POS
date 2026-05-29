import useProducts from "../../products/hooks/useProducts";
import ConfirmButton from "../../../shared/components/ConfirmButton";
import useCart from "../hooks/useCart";
import useStock from "../../stock/hooks/useStock";
import { useState } from "react";
import POSProductCard from "../components/POSProductCard";
import CartTable from "../components/CartTable";
import { checkInsufficientStock } from "../../../shared/utils/stockValidator";
import { createOrder } from "../services/order.service";
import Pagination from "../../../shared/components/Pagination";

export default function POS() {
  const { productsnotall } = useProducts();
  const { stocks, loadStocks } = useStock();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    total,
  } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const productsWithStock = productsnotall.map((product) => {
    const stock = stocks.find((item) => item.Product_id === product.Product_id);

    return {
      ...product,
      stock_qty: stock?.Qty || 0,
    };
  });

  const totalPages = Math.ceil(productsWithStock.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productsWithStock.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Please add products to cart first");
      return;
    }
    try {
      const latestStocks = await loadStocks();
      const insufficientProduct = checkInsufficientStock(
        cartItems,
        latestStocks,
      );

      if (insufficientProduct) {
        alert(
          `สินค้า: ${insufficientProduct.Product_name || insufficientProduct.Product_id} เหลือไม่พอ. สินค้าเหลือเพียง: ${insufficientProduct.availableQty}`,
        );
        return;
      }

      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.Product_id,
          qty: item.qty,
          price: item.Product_price,
        })),

        total,
      };

      await createOrder(payload);
      alert("Order Success");
      clearCart();
      await loadStocks();
    } catch (err) {
      console.error(err);

      alert("Checkout Failed");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-purple-700">POS</h1>

        <p className="text-gray-400">Point Of Sale System</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Products</h2>

              <div className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-xl">
                {productsWithStock.length} Products
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              {currentProducts.map((item) => (
                <POSProductCard
                  key={item.Product_id}
                  product={item}
                  onAdd={addToCart}
                />
              ))}
            </div>
            {productsWithStock.length > itemsPerPage && (
              <div className="pt-4 mt-6 border-t border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-5">
          <div className="sticky p-6 bg-white border border-purple-100 shadow-sm rounded-2xl top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Cart</h2>

              <div className="px-5 py-3 text-xl font-bold text-purple-700 bg-purple-100 rounded-2xl">
                ฿{total}
              </div>
            </div>

            <CartTable
              items={cartItems}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeFromCart}
            />

            <div className="flex justify-end mt-6">
              <ConfirmButton
                title="Confirm Checkout"
                text="Do you want to place this order?"
                icon="question"
                onConfirm={handleCheckout}
                className="w-full px-8 py-4 text-lg font-semibold text-white transition bg-purple-500 shadow-md rounded-2xl hover:bg-purple-600"
              >
                Checkout
              </ConfirmButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
