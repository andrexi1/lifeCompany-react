import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const loggedUser = login(email, password);

        if (!loggedUser) {
            setError("Credenciales incorrectas");
            return;
        }

        // 🔑 USAMOS EL ROL REAL
        if (loggedUser.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Entrar</button>

            <button type="button" onClick={() => navigate("/guest")}>
                Entrar como invitado
            </button>
        </form>
    );
}
