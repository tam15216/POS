import { useState } from "react";
import Sidebar from "../shared/layout/Sidebar";
import Navbar from "../shared/layout/Navbar";

export default function MainLayout({ children }) {
  // 💡 เก็บ State การเปิด/ปิดไว้ที่นี่เพื่อให้ Layout ขยับตามกัน
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <Navbar onToggleSidebar={toggleSidebar} />

        <div className="flex-1 p-5">
          {children}
        </div>
      </div>
    </div>
  );
}