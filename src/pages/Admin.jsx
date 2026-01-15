// src/pages/Admin.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { users, createUser, deleteUser, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await createUser({ email, password, role });
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  // --- Estilos ---
  const container = {
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const panel = {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  };

  const input = {
    width: "100%",
    padding: "12px",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const select = { ...input };

  const button = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "all 0.2s ease",
  };

  const hover = {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  };

  const userRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 1rem",
    background: "#f9fafb",
    borderRadius: "8px",
    marginBottom: "0.8rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease"
  };

  return (
    <div style={container}>
      <div style={panel}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Panel Administrador</h2>
          <button
            style={{ ...button, background: "#ef4444", color: "white" }}
            onClick={() => logout(navigate)}
            onMouseOver={e => Object.assign(e.currentTarget.style, hover)}
            onMouseOut={e => Object.assign(e.currentTarget.style, button)}
          >
            Cerrar sesión
          </button>
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        {/* Crear usuario */}
        <h3>Crear usuario</h3>
        <form onSubmit={handleCreate}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={input}
            required
          />
          <select value={role} onChange={e => setRole(e.target.value)} style={select}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            style={{ ...button, background: "#2563eb", color: "white" }}
            onMouseOver={e => Object.assign(e.currentTarget.style, hover)}
            onMouseOut={e => Object.assign(e.currentTarget.style, button)}
          >
            Crear
          </button>
        </form>

        <hr style={{ margin: "1.5rem 0" }} />

        {/* Usuarios existentes */}
        <h3>Usuarios existentes</h3>
        {users.length === 0 && <p>No hay usuarios</p>}
        {users.map(u => (
          <div
            key={u.uid}
            style={userRow}
            onMouseOver={e => e.currentTarget.style.background = "#e0e7ff"}
            onMouseOut={e => e.currentTarget.style.background = "#f9fafb"}
          >
            <span>{u.email} — {u.role}</span>
            {u.email !== "admin@empresa.com" && (
              <button
                style={{ ...button, background: "#ef4444", color: "white", marginTop: 0 }}
                onClick={() => deleteUser(u.id)}
                onMouseOver={e => Object.assign(e.currentTarget.style, hover)}
                onMouseOut={e => Object.assign(e.currentTarget.style, button)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
