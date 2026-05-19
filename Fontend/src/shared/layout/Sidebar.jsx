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
  ];

  const allowedMenus = menus.filter((menu) => menu.roles.includes(user?.role));

  return (
    <div
      className="
                w-[240px]
                min-h-screen
                bg-white
                border-r
                border-purple-100
                shadow-sm
                p-6
            "
    >
      <h2 className="mb-6 text-2xl font-bold text-purple-700">POS SYSTEM</h2>

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
