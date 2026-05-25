import { useState } from "react";
//import { login } from "../services/api";
import {
  login,
  crearSesion
} from "../services/api";

function Login({ setToken, irRegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    try {
      const res = await login({
        email,
        password,
      });

      // Obtener token y usuario
      const token = res.data.accessToken;
      const user = res.data.user;

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
      localStorage.setItem(
        "role",
        user.role
      );
      localStorage.setItem(
        "userId",
        user.id
      );

      // Actualizar estado
      setToken(token);
// para nueva sesión
    await crearSesion(
  {
    userId: user.id,
    timestamp:
      new Date().toLocaleString()
  },
  token
);

    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="card login-card">
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="btn-primary"
        onClick={iniciarSesion}
      >
        Ingresar
      </button>

      <p className="texto-link">
        ¿No tienes cuenta?{" "}
        <span onClick={irRegistro}>
          Regístrate
        </span>
      </p>
    </div>
  );
}

export default Login;