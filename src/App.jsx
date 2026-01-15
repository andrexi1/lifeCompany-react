// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Guest from "./pages/Guest";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Profiles from "./profiles/Profiles";
import ProfileDetail from "./profiles/ProfileDetail";
import CreateProfile from "./profiles/CreateProfile";
import EditProfile from "./profiles/EditProfile";
import NotFound from "./pages/NotFound";
import Statistics from "./pages/Statistics";


// Componente para rutas privadas
function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/guest" element={<Guest />} />

          {/* Panel de administrador */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route
            path="/statistics"
            element={
              <PrivateRoute roles={["user", "admin"]}>
                <Statistics />
              </PrivateRoute>
            }
          />


          {/* Panel de usuario */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["user"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Rutas de perfiles (solo usuarios pueden crear/editar) */}
          <Route
            path="/profiles"
            element={
              <PrivateRoute roles={["user"]}>
                <Profiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/profiles/:id"
            element={
              <PrivateRoute roles={["user"]}>
                <ProfileDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <PrivateRoute roles={["user"]}>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile/:id"
            element={
              <PrivateRoute roles={["user"]}>
                <EditProfile />
              </PrivateRoute>
            }
          />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
