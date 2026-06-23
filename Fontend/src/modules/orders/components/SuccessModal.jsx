import React, { useEffect } from "react";

export default function SuccessModal({ isOpen, onClose, autoCloseTime = 2500 }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseTime]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm p-6 text-center bg-white shadow-2xl rounded-3xl animate-scale-up">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full">
          <svg
            className="w-12 h-12 text-green-500 animate-checkmark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="mb-1 text-2xl font-bold text-gray-800">
          ชำระเงินเรียบร้อย
        </h3>
        <p className="text-gray-500">ระบบได้บันทึกคำสั่งซื้อของคุณแล้ว</p>
      </div>
    </div>
  );
}