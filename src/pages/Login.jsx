import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>

      <button onClick={() => { login("user"); navigate("/dashboard"); }}>
        Entrar como Usuario
      </button>

      <button onClick={() => { login("admin"); navigate("/admin"); }}>
        Entrar como Admin
      </button>

      <button onClick={() => navigate("/guest")}>
        Entrar como Invitado
      </button>
    </div>
  );
}
