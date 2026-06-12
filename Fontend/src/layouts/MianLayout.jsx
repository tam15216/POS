// src/shared/layout/MainLayout.jsx

import { useState } from "react";
import Sidebar from "../shared/layout/Sidebar";
import Navbar from "../shared/layout/Navbar";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <div className="sticky top-0 flex h-screen">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className="flex flex-col flex-1 w-0 max-w-full min-w-0 overflow-x-hidden transition-all duration-300">
        <Navbar onToggleSidebar={toggleSidebar} />

        <div className="flex-1 w-full max-w-full p-5 overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
