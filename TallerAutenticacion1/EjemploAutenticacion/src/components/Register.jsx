import { useState } from "react";
import { register } from "../services/api";

function Register({ volverLogin }) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

  const [linkActivacion, setLinkActivacion] =
    useState("");

  const registrar = async () => {
    try {

      const res = await register({
        email,
        password,
        role,
        activo: false
      });

      // CREAR LINK
      setLinkActivacion(
        `/activar/${res.data.user.id}`
      );

      alert("Usuario creado");

      setEmail("");
      setPassword("");
      setRole("user");

    } catch (error) {

      console.log(error);

      if (
        error.response?.data ===
        "Email already exists"
      ) {
        alert(
          "El correo ya existe"
        );
      } else {
        alert(
          "Error al registrar"
        );
      }
    }
  };

  return (
    <div className="card login-card">
      <h2>Registro</h2>

      <input
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

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
      >
        <option value="user">
          Usuario
        </option>

        <option value="admin">
          Admin
        </option>
      </select>

      <button
        className="btn-primary"
        onClick={registrar}
      >
        Registrar
      </button>

      {linkActivacion && (
        <div
          style={{
            marginTop: "15px"
          }}
        >
          <p>
            Activa tu cuenta con el enlace:
          </p>

          <a href={linkActivacion}>
            {linkActivacion}
          </a>
        </div>
      )}

      <p className="texto-link">
        ¿Ya tienes cuenta?{" "}
        <span onClick={volverLogin}>
          Inicia sesión
        </span>
      </p>
    </div>
  );
}

export default Register;