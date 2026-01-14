import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Panel Administrador</h2>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
