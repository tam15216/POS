import { useState } from "react";
import useIngredients from "../hooks/useIngredients";
import IngredientForm from "../components/IngredientForm";
import IngredientTable from "../components/IngredientTable";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/Pagination";
import IngredientHistoryTable from "../components/IngredientHistoryTable";
import StockTransactionModal from "../components/StockTransactionModal";
export default function Ingredients() {
  const {
    ingredients,
    loading,
    history,
    changeStock,
    addIngredient,
    editIngredient,
    removeIngredient,
  } = useIngredients();

  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const handleOpenStockModal = (item) => {
    setSelectedStockItem(item);
    setStockModalOpen(true);
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

  const ingredientPagination = usePagination(ingredients || [], 10);

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

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "คุณมั่นใจใช่หรือไม่ว่าต้องการลบวัตถุดิบรายการนี้ออกจากระบบ?",
      )
    )
      return;
    try {
      await removeIngredient(id);
      alert("ลบรายการวัตถุดิบเรียบร้อยแล้ว");
    } catch (err) {
      alert("ไม่สามารถลบได้ วัตถุดิบนี้อาจถูกใช้งานอยู่ในสูตรสินค้า");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">คลังวัตถุดิบ</h1>
          <p className="mt-1 text-gray-400">
            จัดการรายการวัตถุดิบดิบและจำนวนคงเหลือในระบบ
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition-colors"
        >
          ➕ เพิ่มวัตถุดิบใหม่
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">กำลังโหลดคลังวัตถุดิบ...</p>
      ) : (
        <div className="space-y-4">
          <IngredientTable
            ingredients={ingredientPagination.paginatedData}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
            onManageStock={handleOpenStockModal}
          />
          <StockTransactionModal
            isOpen={stockModalOpen}
            onClose={() => {
              setStockModalOpen(false);
              setSelectedStockItem(null);
            }}
            onSave={handleStockSave}
            ingredient={selectedStockItem}
          />

          {ingredients.length > 0 && (
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
        ) : (
          <IngredientHistoryTable history={history} />
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
