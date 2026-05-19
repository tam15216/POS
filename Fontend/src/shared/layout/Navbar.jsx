import { useNavigate } from "react-router-dom";

import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div
            className="
                h-[70px]
                bg-white
                border-b
                border-purple-100
                shadow-sm
                flex
                items-center
                justify-between
                px-6
            "
        >
            <div>
                <h3 className="text-2xl font-bold text-purple-700">
                    Dashboard
                </h3>

                <p className="text-sm text-gray-400">
                    Welcome back, here is your dashboard overview.
                </p>
            </div>

            <button
                onClick={handleLogout}
                className="px-5 py-2 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
            >
                Logout
            </button>
        </div>
    );
}