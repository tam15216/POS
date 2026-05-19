import { Link } from "react-router-dom";

export default function Sidebar() {
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
            <h2 className="mb-6 text-2xl font-bold text-purple-700">
                POS SYSTEM
            </h2>

            <div className="mb-6 border-b border-purple-100"></div>

            <ul className="space-y-3">

                <li>
                    <Link
                        to="/dashboard"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        to="/products"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Products
                    </Link>
                </li>

                <li>
                    <Link
                        to="/categories"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Categories
                    </Link>
                </li>

                <li>
                    <Link
                        to="/stock"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Stock
                    </Link>
                </li>

                <li>
                    <Link
                        to="/orders"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Orders
                    </Link>
                </li>

                <li>
                    <Link
                        to="/reports"
                        className="block px-4 py-3 font-medium text-gray-700 transition rounded-xl hover:bg-purple-100 hover:text-purple-700"
                    >
                        Reports
                    </Link>
                </li>

            </ul>
        </div>
    );
}