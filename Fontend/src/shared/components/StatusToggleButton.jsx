import ConfirmButton from "../../shared/components/ConfirmButton"; 

export default function StatusToggleButton({ isActive, onConfirm }) {
  return (
    <ConfirmButton
      title={isActive ? "ยืนยันการปิดสถานะ" : "ยืนยันการเปิดสถานะ"}
      text={isActive ? "คุณแน่ใจหรือไม่ที่จะปิดใช้งานรายการนี้?" : "คุณแน่ใจหรือไม่ที่จะเปิดใช้งานรายการนี้?"}
      icon="warning"
      onConfirm={onConfirm} 
    >
      <span
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none inline-block ${
          isActive
            ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
        }`}
      >
        {isActive ? "ปิดสถานะ" : "เปิดสถานะ"}
      </span>
    </ConfirmButton>
  );
}