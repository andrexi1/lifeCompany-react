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

  return (
    <div>
      <h2>Panel Administrador</h2>

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      <h3>Crear usuario</h3>

      <form onSubmit={handleCreate}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Crear</button>
      </form>

      <hr />

      <h3>Usuarios existentes</h3>

      {users.length === 0 && <p>No hay usuarios</p>}

      {users.map((u) => {
        const isRootAdmin = u.email === "admin@empresa.com";

        return (
          <div key={u.id} style={{ marginBottom: "8px" }}>
            <strong>{u.email}</strong> — {u.role}

            {!isRootAdmin && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteUser(u.id)}
              >
                Eliminar
              </button>
            )}

            {isRootAdmin && (
              <span style={{ marginLeft: "10px", color: "gray" }}>
                (admin principal)
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
