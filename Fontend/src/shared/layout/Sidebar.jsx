import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";
export default function Sidebar() {
  const { user } = useAuth();

  const menus = [
    { name: "Dashboard", to: "/dashboard", roles: ["admin", "cashier"] },
    { name: "Products", to: "/products", roles: ["admin", "stock"] },
    { name: "Categories", to: "/categories", roles: ["admin"] },
    { name: "Stock", to: "/stock", roles: ["admin", "stock"] },
    { name: "Orders", to: "/orders", roles: ["admin", "cashier"] },
    { name: "Reports", to: "/reports", roles: ["admin"] },
    { name: "User", to: "/users" , roles:["admin"] },
  ];

  const allowedMenus = menus.filter((menu) => menu.roles.includes(user?.role));

  return (
<div className="w-[240px] min-h-screen bg-white border-r border-purple-100 shadow-sm p-6">

  {/* Logo Section */}
  <div className="flex flex-col items-center mb-6">
    
    <div className="flex items-center justify-center shadow-sm w-14 h-14 rounded-2xl bg-purple-50">
      <img
        src="/speexx.ico"
        alt="POS SYSTEM"
        className="flex items-center justify-center border border-purple-100 rounded-full shadow-sm w-14 h-14 bg-purple-50"
      />
    </div>

    <h2 className="mt-3 text-sm font-bold tracking-wide text-purple-700">
      POS SYSTEM
    </h2>

  </div>

  <div className="mb-6 border-b border-purple-100"></div>

  <ul className="space-y-3">
    {allowedMenus.map((menu) => (
      <li key={menu.to}>
        <Link
          to={menu.to}
          className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
        >
          {menu.name}
        </Link>
      </li>
    ))}
  </ul>

</div>
  );
}
