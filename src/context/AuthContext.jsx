// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // --- Cargar usuarios de Firestore ---
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- Login ---
  const login = async (email, password) => {
    const matchedUser = users.find(u => u.email === email);
    if (!matchedUser) throw new Error("Usuario no registrado");
    if (matchedUser.password !== password) throw new Error("Contraseña incorrecta");

    setUser(matchedUser);
    return matchedUser;
  };

  // --- Logout ---
  const logout = (navigate) => {
    setUser(null);
    if (navigate) navigate("/login");
  };

  // --- Crear usuario ---
  const createUser = async ({ email, password, role }) => {
    const newUser = { email, password, role, uid: crypto.randomUUID() };
    await addDoc(collection(db, "users"), newUser);
    fetchUsers();
  };

  // --- Eliminar usuario ---
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  return (
    <AuthContext.Provider value={{ users, user, login, logout, createUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}
