import { createContext, useContext, useState } from "react";
import { users as initialUsers } from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(initialUsers);

    const login = (email, password) => {
        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!foundUser) return null;

        setUser(foundUser);
        return foundUser; // 🔑 DEVOLVEMOS EL USUARIO
    };

    const logout = () => setUser(null);

    const createUser = ({ email, password, role }) => {
        setUsers((prev) => [
            ...prev,
            {
                id: Date.now(),
                email,
                password,
                role,
            },
        ]);
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
