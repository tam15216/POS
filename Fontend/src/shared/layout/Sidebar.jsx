import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const menus = [
    { name: "Dashboard", to: "/dashboard", roles: ["admin"] },
    { name: "Products", to: "/products", roles: ["admin", "stock"] },
    { name: "Categories", to: "/categories", roles: ["admin"] },
    { name: "Stock", to: "/stock", roles: ["admin", "stock"] },
    { name: "Orders", to: "/orders", roles: ["admin"] },
    { name: "POS", to: "/pos", roles: ["admin", "cashier"] },
    { name: "User", to: "/users", roles: ["admin"] },
    { name: "Ingredients", to: "/ingredients", roles: ["admin"] },
    { name: "Recipes", to: "/recipes", roles: ["admin"] },
  ];

  const reportSubMenus = [
    { name: "รายงานยอดขาย", to: "/reports/SalesReport", roles: ["admin"] },
    {
      name: "รายงานสินค้าขายดี",
      to: "/reports/top-products",
      roles: ["admin"],
    },
    {
      name: "รายงานเคลื่อนไหวสต๊อก",
      to: "/reports/stock-log",
      roles: ["admin"],
    },
  ];

  const allowedMenus = menus.filter((menu) => menu.roles.includes(user?.role));
  const allowedReportSubMenus = reportSubMenus.filter((sub) =>
    sub.roles.includes(user?.role),
  );

  const [isReportOpen, setIsReportOpen] = useState(
    currentPath.startsWith("/report"),
  );

  useEffect(() => {
    if (currentPath.startsWith("/report")) {
      setIsReportOpen(true);
    }
  }, [currentPath]);

  return (
    <div
      className={`h-screen sticky top-0 bg-white border-r border-purple-100 shadow-sm p-6 overflow-y-auto transition-all duration-300 flex flex-col ${
        isOpen
          ? "w-[240px] opacity-100"
          : "w-0 p-0 opacity-0 pointer-events-none border-none"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 shadow-sm rounded-xl bg-purple-50">
            <img src="/speexx.ico" alt="POS" className="w-8 h-8 rounded-full" />
          </div>
          <h2 className="text-sm font-bold tracking-wide text-purple-700">
            POS SYSTEM
          </h2>
        </div>
      </div>

      <div className="mb-6 border-b border-purple-100"></div>

      <ul className="flex-1 space-y-2">
        {allowedMenus.map((menu) => {
          const isActive = currentPath === menu.to;
          return (
            <li key={menu.to}>
              <Link
                to={menu.to}
                className={`block px-4 py-3 font-medium transition rounded-xl ${
                  isActive
                    ? "bg-purple-100 text-purple-700 font-bold"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}

        {allowedReportSubMenus.length > 0 && (
          <li className="space-y-1">
            <button
              onClick={() => setIsReportOpen(!isReportOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 font-medium transition rounded-xl ${
                currentPath.startsWith("/report")
                  ? "bg-purple-50 text-purple-700 font-bold"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              <span>Reports</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isReportOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                isReportOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {allowedReportSubMenus.map((sub) => {
                const isSubActive = currentPath === sub.to;
                return (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={`block px-4 py-2 text-sm font-medium transition rounded-lg ${
                      isSubActive
                        ? "bg-purple-100 text-purple-700 font-bold"
                        : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    • {sub.name}
                  </Link>
                );
              })}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
