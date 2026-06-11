import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../shared/components/ConfirmButton";
import { useAuth } from "../../modules/auth/hooks/useAuth";

// 💡 1. เพิ่มการรับ Props ชื่อ onToggleSidebar เข้ามาในฟังก์ชัน
export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-[70px] bg-white border-b border-purple-100 shadow-sm flex items-center justify-between px-6">
      {/* กลุ่มฝั่งซ้าย: ปุ่มเปิดเมนู + ข้อความต้อนรับ */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 text-purple-600 transition-colors bg-purple-50 rounded-xl hover:bg-purple-100 focus:outline-none"
          title="เปิด/ปิด เมนูข้าง"
        >
          <span className="flex items-center justify-center w-6 h-6 text-xl font-bold">
            ☰
          </span>
        </button>

        <div>
          <h3 className="text-xl font-bold leading-tight text-purple-700">
            Dashboard
          </h3>
          <p className="text-xs text-gray-400">
            Welcome back, {user?.username}
          </p>
        </div>
      </div>

      <ConfirmButton
        title="Logout?"
        text="Are you sure you want to logout?"
        icon="question"
        onConfirm={handleLogout}
        className="px-5 py-2 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
      >
        Logout
      </ConfirmButton>
    </div>
  );
}
