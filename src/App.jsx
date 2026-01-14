// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProfilesProvider } from "./context/ProfilesContext";

// Componentes de páginas
import Login from "./pages/Login";
import Guest from "./pages/Guest";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

// Componentes de perfiles
import CreateProfile from "./profiles/CreateProfile";
import EditProfile from "./profiles/EditProfile";
import FullProfilesList from "./profiles/FullProfilesList";
import ProfileDetail from "./profiles/ProfileDetail";  // ← ¡Este faltaba!
import Statistics from "./pages/Statistics";

// Componente de protección
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/guest" element={<Guest />} />

            {/* Rutas protegidas para usuarios y admins */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-profile"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <CreateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <ProfileDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profiles"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <FullProfilesList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <Statistics />
                </ProtectedRoute>
              }
            />

            {/* Ruta de administrador */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Ruta por defecto */}
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ProfilesProvider>
    </AuthProvider>
  );
}

export default App;