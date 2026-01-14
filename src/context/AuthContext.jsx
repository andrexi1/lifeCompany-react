// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { users as initialUsers } from "../data/users";

const AuthContext = createContext();

const STORAGE_KEY = "health_app_user";

export function AuthProvider({ children }) {
  // Intentamos cargar usuario y lista de usuarios desde localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("health_app_users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  // Guardamos usuario cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Guardamos lista de usuarios cuando cambia
  useEffect(() => {
    localStorage.setItem("health_app_users", JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return null;

    setUser(foundUser);
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem(STORAGE_KEY);  ← ya lo hace el useEffect
  };

  const createUser = ({ email, password, role }) => {
    const newUser = {
      id: Date.now(),
      email,
      password,
      role,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}