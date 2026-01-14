import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { users, createUser, deleteUser, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    createUser({ email, password, role });

    setEmail("");
    setPassword("");
    setRole("user");
  };

  const containerStyle = {
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)"
  };

  const panelStyle = {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  };

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "0.5rem"
  };

  const hoverEffect = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  };

  const userRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    marginBottom: "0.8rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "transform 0.2s, box-shadow 0.2s"
  };

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Panel Administrador</h2>
          <button
            style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
            onClick={logout}
            onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Cerrar sesión
          </button>
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        <h3>Crear usuario</h3>
        <form onSubmit={handleCreate}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} style={selectStyle}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>

          <button
            type="submit"
            style={{ ...buttonStyle, background: "#0066cc", color: "white" }}
            onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Crear
          </button>
        </form>

        <hr style={{ margin: "1.5rem 0" }} />

        <h3>Usuarios existentes</h3>
        {users.length === 0 && <p>No hay usuarios</p>}

        {users.map((u) => {
          const isRootAdmin = u.email === "admin@empresa.com";
          return (
            <div
              key={u.id}
              style={userRowStyle}
              onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
              onMouseOut={e => Object.assign(e.currentTarget.style, userRowStyle)}
            >
              <span>
                <strong>{u.email}</strong> — {u.role}
                {isRootAdmin && <span style={{ color: "gray", marginLeft: "0.5rem" }}>(admin principal)</span>}
              </span>

              {!isRootAdmin && (
                <button
                  style={{ ...buttonStyle, background: "#dc3545", color: "white", marginTop: 0 }}
                  onClick={() => deleteUser(u.id)}
                  onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
                  onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
                >
                  Eliminar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
