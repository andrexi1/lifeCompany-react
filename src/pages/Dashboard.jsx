import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfilesList from "../profiles/ProfileList";
import CreateProfile from "../profiles/CreateProfile";

export default function Dashboard() {
  const { logout } = useAuth();
  const [view, setView] = useState("list");

  return (
    <div>
      <h2>Dashboard</h2>

      <nav>
        <button onClick={() => setView("list")}>Mostrar perfiles</button>
        <button onClick={() => setView("create")}>Nuevo perfil</button>
        <button onClick={logout}>Cerrar sesión</button>
      </nav>

      <hr />

      {view === "list" && <ProfilesList />}
      {view === "create" && <CreateProfile />}
    </div>
  );
}
