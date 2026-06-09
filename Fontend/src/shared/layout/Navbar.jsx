import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../shared/components/ConfirmButton";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-[70px] bg-white border-b border-purple-100 shadow-sm flex items-center justify-between px-6 ">
      <div>
        <h3 className="text-2xl font-bold text-purple-700">Dashboard</h3>

        <p className="text-sm text-gray-400">
          Welcome back, {user?.username}
        </p>
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
