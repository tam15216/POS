import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="relative">
          <h1 className="font-black text-purple-100 select-none text-9xl animate-pulse">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center mt-4 text-2xl font-bold text-purple-700">
            ไม่พบหน้านี้ในระบบ
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            ขออภัย! คุณไม่มีสิทธิ์เข้าถึง หรือลิงก์อาจไม่ถูกต้อง
          </h2>
          <p className="max-w-sm mx-auto text-sm text-gray-400">
            หน้าเว็บที่คุณต้องการเข้าถึงอาจถูกจำกัดสิทธิ์เฉพาะแอดมิน
            หรืออาจถูกย้ายไปที่อื่นแล้ว
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 text-sm font-semibold text-purple-700 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors border border-purple-100"
          >
            ⬅ ย้อนกลับไปก่อนหน้า
          </button>

          <button
            type="button"
            onClick={() => navigate("/pos")}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-100"
          >
            🏠 ไปที่หน้าขายสินค้า (POS)
          </button>
        </div>
      </div>
    </div>
  );
}
