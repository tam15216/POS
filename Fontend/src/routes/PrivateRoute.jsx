import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const userRole = String(user?.role || user?.Role || "").toLowerCase().trim();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-sm font-semibold text-purple-600 animate-pulse">
          กำลังตรวจสอบสิทธิ์ระบบ...
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0) {
    const lowerAllowedRoles = allowedRoles.map((role) =>
      String(role).toLowerCase().trim()
    );

    if (!lowerAllowedRoles.includes(userRole)) {
      return <Navigate to="/404" replace />;
    }
  }

  return children;
}