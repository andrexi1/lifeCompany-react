import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Dashboard Usuario</h2>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
