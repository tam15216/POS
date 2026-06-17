import { useState, useEffect } from "react";
import useIngredients from "../hooks/useIngredients";
import IngredientForm from "../components/IngredientForm";
import IngredientTable from "../components/IngredientTable";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";
import IngredientHistoryTable from "../components/IngredientHistoryTable";
import StockTransactionModal from "../components/StockTransactionModal";
import ProductSearch from "../../products/components/ProductSearch";
import RestockFormModal from "../components/RestockFormModal";

export default function Ingredients() {
  const {
    ingredients,
    loading,
    history,
    changeStock,
    addIngredient,
    editIngredient,
    restockIngredient,
    changeIngredientStatus, 
  } = useIngredients();

  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [selectedRestockItem, setSelectedRestockItem] = useState(null);

  const handleOpenStockModal = (item) => {
    setSelectedStockItem(item);
    setStockModalOpen(true);
  };

  const handleOpenRestockModal = (item) => {
    setSelectedRestockItem(item);
    setRestockModalOpen(true);
  };

  const handleStockSave = async (id, transactionData) => {
    try {
      await changeStock(id, transactionData);
      alert("บันทึกข้อมูลธุรกรรมคลังสินค้าเรียบร้อย");
      setStockModalOpen(false);
      setSelectedStockItem(null);
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการทำรายการ");
    }
  };

  const handleRestockSave = async (id, payload) => {
    try {
      await restockIngredient(id, payload);
      alert("บันทึกรับเข้าคลังและคำนวณต้นทุนถัวเฉลี่ยใหม่เรียบร้อยแล้ว");
      setRestockModalOpen(false);
      setSelectedRestockItem(null);
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการทำรายการรับเข้าสต๊อก");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await changeIngredientStatus(id, currentStatus);
      alert(
        currentStatus ? "ปิดใช้งานวัตถุดิบสำเร็จ" : "เปิดใช้งานวัตถุดิบสำเร็จ",
      );
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการเปลี่ยนสถานะวัตถุดิบ");
    }
  };

  const filteredIngredients = (ingredients || []).filter((ing) => {
    return ing.Ingredient_name?.toLowerCase().includes(
      searchTerm.toLowerCase(),
    );
  });

  const filteredHistory = (history || []).filter((log) => {
    return log.Ingredient_name?.toLowerCase().includes(
      searchTerm.toLowerCase(),
    );
  });

  const ingredientPagination = usePagination(filteredIngredients, 10);
  const historyPagination = usePagination(filteredHistory, 10);

  useEffect(() => {
    ingredientPagination.setCurrentPage(1);
    historyPagination.setCurrentPage(1);
  }, [searchTerm]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleFormSave = async (formData) => {
    try {
      if (editingItem) {
        await editIngredient(editingItem.Ingredient_id, formData);
        alert("แก้ไขข้อมูลวัตถุดิบสำเร็จ");
      } else {
        await addIngredient(formData);
        alert("เพิ่มวัตถุดิบใหม่สำเร็จ");
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">คลังวัตถุดิบ</h1>
          <p className="mt-1 text-gray-400">
            จัดการรายการวัตถุดิบดิบและจำนวนคงเหลือในระบบ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ProductSearch value={searchTerm} onChange={setSearchTerm} />

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition-colors whitespace-nowrap"
          >
            ➕ เพิ่มวัตถุดิบใหม่
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">กำลังโหลดคลังวัตถุดิบ...</p>
      ) : (
        <div className="space-y-4">
          {filteredIngredients.length === 0 ? (
            <div className="py-10 text-center text-gray-400 bg-white border border-gray-100 rounded-2xl">
              ไม่พบข้อมูลวัตถุดิบที่ค้นหา
            </div>
          ) : (
            <IngredientTable
              ingredients={ingredientPagination.paginatedData}
              onEdit={handleOpenEditModal}
              onManageStock={handleOpenStockModal}
              onRestock={handleOpenRestockModal}
              onChangeStatus={handleToggleStatus} 
            />
          )}

          <StockTransactionModal
            isOpen={stockModalOpen}
            onClose={() => {
              setStockModalOpen(false);
              setSelectedStockItem(null);
            }}
            onSave={handleStockSave}
            ingredient={selectedStockItem}
          />

          <RestockFormModal
            isOpen={restockModalOpen}
            onClose={() => {
              setRestockModalOpen(false);
              setSelectedRestockItem(null);
            }}
            onSave={handleRestockSave}
            ingredient={selectedRestockItem}
          />

          {filteredIngredients.length > 0 && (
            <Pagination
              currentPage={ingredientPagination.currentPage}
              totalPages={ingredientPagination.totalPages}
              onPageChange={ingredientPagination.setCurrentPage}
            />
          )}
        </div>
      )}

      <div className="pt-8 space-y-4 border-t border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-purple-700">
            ประวัติการเคลื่อนไหววัตถุดิบ
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            ตรวจสอบประวัติการรับเข้าวัตถุดิบ การหักยอดขายน้ำชง
            และการปรับปรุงสต๊อกย้อนหลัง
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">กำลังโหลดข้อมูลประวัติ...</p>
        ) : filteredHistory.length === 0 ? (
          <div className="py-10 text-center text-gray-400 bg-white border border-gray-100 rounded-2xl">
            ไม่พบข้อมูลประวัติวัตถุดิบที่ค้นหา
          </div>
        ) : (
          <>
            <IngredientHistoryTable history={historyPagination.paginatedData} />
            <Pagination
              currentPage={historyPagination.currentPage}
              totalPages={historyPagination.totalPages}
              onPageChange={historyPagination.setCurrentPage}
            />
          </>
        )}
      </div>

      <IngredientForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleFormSave}
        editData={editingItem}
      />
    </div>
  );
}
