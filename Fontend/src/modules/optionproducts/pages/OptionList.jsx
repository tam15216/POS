import { useState, useEffect } from "react";
import useOptionsList from "../hooks/useOptionsList";
import {
  createOption,
  updateOption,
  updateOptionStatus,
} from "../services/option.service";

import AddOptionForm from "../components/AddOptionForm";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import StatusToggleButton from "../../../shared/components/StatusToggleButton";

export default function OptionList() {
  const { optionsList, isLoading, error, refreshOptions } = useOptionsList();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const optionsPagination = usePagination(optionsList, 8);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleCreateOrUpdate = async (optionData) => {
    try {
      if (editingOption) {
        await updateOption(editingOption.Option_id, optionData);
        alert("แก้ไขข้อมูล Option สำเร็จ");
      } else {
        await createOption(optionData);
        alert("สร้าง Option ใหม่สำเร็จ");
      }
      setIsAddModalOpen(false);
      setEditingOption(null);
      refreshOptions();
    } catch (err) {
      alert("ไม่สามารถบันทึกข้อมูลได้");
      throw err;
    }
  };

  const handleToggleStatus = async (optionId, currentStatus) => {
    const nextStatus = currentStatus === 1 ? 0 : 1;
    try {
      await updateOptionStatus(optionId, nextStatus);
      refreshOptions();
    } catch (err) {
      alert("ไม่สามารถเปลี่ยนสถานะได้");
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      <div className="flex flex-col gap-4 pb-4 border-b sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            รายการ Option ทั้งหมด
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            จัดการข้อมูลชื่อ ราคา และควบคุมการเปิด-ปิดการใช้งานที่หน้าจอ POS
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingOption(null);
            setIsAddModalOpen(true);
          }}
          className="px-5 py-2.5 bg-purple-600 text-white font-medium text-sm rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-100 flex items-center gap-2"
        >
          <span>+</span> เพิ่มรายการ Option ใหม่
        </button>
      </div>

      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-2xl">
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4">รหัส Option</th>
                <th className="px-6 py-4">ชื่อตัวเลือก</th>
                <th className="px-6 py-4 text-right">ราคาเพิ่ม (บาท)</th>
                <th className="px-6 py-4 text-center">สถานะใช้งาน</th>
                <th className="px-6 py-4 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-xs font-medium text-center text-purple-500"
                  >
                    กำลังโหลดข้อมูลรายการ Option...
                  </td>
                </tr>
              ) : optionsList.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-xs text-center text-gray-400"
                  >
                    ยังไม่มีรายการ Option ใด ๆ ในระบบ
                  </td>
                </tr>
              ) : (
                optionsPagination.paginatedData.map((opt) => {
                  const isActive = opt.Is_active === 1;

                  return (
                    <tr key={opt.Option_id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">
                        #{opt.Option_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {opt.Option_name}
                      </td>
                      <td className="px-6 py-4 font-mono text-right text-gray-700">
                        +฿{opt.Price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                            isActive
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : "bg-red-50 text-red-400 border border-red-100"
                          }`}
                        >
                          {isActive ? "เปิดขายปกติ" : "ปิดการขาย"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingOption(opt);
                              setIsAddModalOpen(true);
                            }}
                            disabled={!isActive}
                            className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 hover:text-purple-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-purple-50 disabled:hover:text-purple-700"
                          >
                            แก้ไข
                          </button>
                          <StatusToggleButton
                            isActive={isActive}
                            onConfirm={() =>
                              handleToggleStatus(opt.Option_id, opt.Is_active)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && optionsList.length > 0 && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Pagination
              currentPage={optionsPagination.currentPage}
              totalPages={optionsPagination.totalPages}
              onPageChange={optionsPagination.setCurrentPage}
            />
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center duration-150 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md p-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingOption(null);
              }}
              className="absolute z-10 text-sm font-bold text-gray-400 top-8 right-8 hover:text-gray-600"
            >
              ✕
            </button>
            <AddOptionForm
              onCreateSuccess={handleCreateOrUpdate}
              onClose={() => {
                setIsAddModalOpen(false);
                setEditingOption(null);
              }}
              initialData={editingOption}
            />
          </div>
        </div>
      )}
    </div>
  );
}
