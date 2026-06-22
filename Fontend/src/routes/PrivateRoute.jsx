import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}