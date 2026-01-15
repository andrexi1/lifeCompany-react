// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  // Mientras se carga la sesión, no mostrar nada (o un loader)
  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando...</div>;
  }

  // Si no hay usuario logueado, redirigir al login
  if (!user) {
    return <Navigate to="/guest" replace />;
  }

  // Si el rol del usuario no está permitido
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/guest" replace />;
  }

  return children;
}
