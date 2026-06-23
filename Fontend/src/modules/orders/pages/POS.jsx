import { useState } from "react";
import useProducts from "../../products/hooks/useProducts";
import ConfirmButton from "../../../shared/components/ConfirmButton";
import useCart from "../hooks/useCart";
import useStock from "../../stock/hooks/useStock";
import useCategories from "../../categories/hooks/useCategories";
import useProductOptions from "../hooks/useProductOptions";

import POSProductCard from "../components/POSProductCard";
import CartTable from "../components/CartTable";
import ProductSearch from "../../products/components/ProductSearch";
import ProductCategory from "../../products/components/ProductCategory";
import PaymentSelector from "../components/PaymentSelector";

import ProductOptionModal from "../components/ProductOptionModal";
import SuccessModal from "../components/SuccessModal";

import { checkInsufficientStock } from "../../../shared/utils/stockValidator";
import { createOrder } from "../services/order.service"; 
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import usePOSFilter from "../hooks/usePOSFilter";

export default function POS() {
  const { productsnotall } = useProducts();
  const { stocks, loadStocks } = useStock();
  const { categories } = useCategories();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    total,
  } = useCart();

  const { allOptions } = useProductOptions();

  const productsWithStock = productsnotall.map((product) => {
    if (product.Product_type === "made_to_order") {
      return {
        ...product,
        stock_qty: 999,
      };
    }

    const stock = stocks.find((item) => item.Product_id === product.Product_id);
    return {
      ...product,
      stock_qty: stock?.Qty || 0,
    };
  });

  const {
    searchQuery,
    selectedCategory,
    filteredProducts,
    handleSearchChange,
    handleCategoryChange,
  } = usePOSFilter(productsWithStock);

  const productsnotallPagination = usePagination(filteredProducts, 8);

  const onSearch = (value) => {
    handleSearchChange(value);
    productsnotallPagination.setCurrentPage(1);
  };

  const onCategorySelect = (value) => {
    handleCategoryChange(value);
    productsnotallPagination.setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    const isMadeToOrder =
      product.Product_type?.toLowerCase() === "made_to_order" ||
      product.Product_type?.toLowerCase() === "drink" ||
      product.Product_type?.toLowerCase() === "beverage";

    if (isMadeToOrder) {
      setActiveProduct(product);
      setIsOptionModalOpen(true);
    } else {
      addToCart(product, []);
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
          price: item.Base_price,
          options: item.selected_options
            ? item.selected_options.map((opt) => ({
                option_id: opt.Option_id,
                price: opt.Price,
                ingredient_id: opt.Ingredient_id,
              }))
            : [],
        })),
        total,
        payment_method: paymentMethod,
      };
      await createOrder(payload);
      setIsSuccessModalOpen(true);
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
        <h1 className="mb-2 text-4xl font-bold text-purple-700">ขายสินค้า</h1>
        <p className="text-gray-400">ระบบขายสินค้า</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-gray-700">สินค้า</h2>

              <div className="flex flex-wrap items-center gap-3">
                <ProductSearch value={searchQuery} onChange={onSearch} />

                <div className="w-48">
                  <ProductCategory
                    value={selectedCategory}
                    onChange={onCategorySelect}
                    categories={categories || []}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              {filteredProducts.length === 0 ? (
                <div className="w-full py-12 font-medium text-center text-gray-400">
                  ไม่พบรายการสินค้าที่ตรงตามเงื่อนไขค้นหา
                </div>
              ) : (
                productsnotallPagination.paginatedData.map((item) => (
                  <POSProductCard
                    key={item.Product_id}
                    product={item}
                    onAdd={handleProductClick}
                  />
                ))
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="pt-4 mt-6 border-t border-gray-100">
                <Pagination
                  currentPage={productsnotallPagination.currentPage}
                  totalPages={productsnotallPagination.totalPages}
                  onPageChange={productsnotallPagination.setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-5">
          <div className="sticky p-6 bg-white border border-purple-100 shadow-sm rounded-2xl top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-700">ตะกร้าสินค้า</h2>
              <div className="px-5 py-3 text-xl font-bold text-purple-700 bg-purple-100 rounded-2xl">
                ฿{total}
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto border border-purple-100 rounded-2xl">
              <CartTable
                items={cartItems}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onRemove={removeFromCart}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <PaymentSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <ConfirmButton
                title="ยืนยันการชำระเงิน"
                text="ต้องการยืนยันการชำระเงินสำหรับรายการนี้หรื่อไม่?"
                icon="question"
                onConfirm={handleCheckout}
                className="px-8 py-4 text-lg font-semibold text-white transition bg-purple-500 shadow-md rounded-2xl hover:bg-purple-600"
              >
                ชำระเงิน
              </ConfirmButton>
            </div>
          </div>
        </div>
      </div>

      <ProductOptionModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        product={activeProduct}
        options={allOptions}
        onConfirm={addToCart}
      />

      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
        autoCloseTime={2500}
      />
    </div>
  );
}
