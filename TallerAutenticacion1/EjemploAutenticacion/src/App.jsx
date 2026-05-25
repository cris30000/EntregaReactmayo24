import { useState,useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import HistorialComponent
from "./components/HistorialComponent";

import Login from "./components/Login";
import Register from "./components/Register";
import ProductoLista from "./components/ProductoLista";
import AdminUsuarios from "./components/AdminUsuarios";
import Activar from "./components/Activar";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [mostrarRegistro, setMostrarRegistro] =
    useState(false);

    const role = localStorage.getItem("role");
    //const TIEMPO_INACTIVIDAD = 1 * 60 * 1000;
    const TIEMPO_INACTIVIDAD = 10 * 1000; // de 10 segundos para pruebas
    useEffect(() => {
  if (!token) return;

  let timer;

  const cerrarSesion = () => {

  alert(
    "Sesión cerrada por inactividad"
  );

  localStorage.clear();

  setToken(null);

  window.location.href = "/";
};
  const reiniciarTimer = () => {
    clearTimeout(timer);

    timer = setTimeout(
      cerrarSesion,
      TIEMPO_INACTIVIDAD
    );
  };

  // Eventos de actividad
  window.addEventListener(
    "mousemove",
    reiniciarTimer
  );

  window.addEventListener(
    "keydown",
    reiniciarTimer
  );

  window.addEventListener(
    "click",
    reiniciarTimer
  );

  // iniciar contador
  reiniciarTimer();

  return () => {
    clearTimeout(timer);

    window.removeEventListener(
      "mousemove",
      reiniciarTimer
    );

    window.removeEventListener(
      "keydown",
      reiniciarTimer
    );

    window.removeEventListener(
      "click",
      reiniciarTimer
    );
  };
}, [token]);
    const fondoClase =
  role === "admin"
    ? "admin-bg"
    : role === "user"
    ? "user-bg"
    : "";
    const cerrarSesion = () => {

  // borrar token y datos
  localStorage.clear();

  // mensaje
  alert(
    "Sesión cerrada correctamente"
  );

  // actualizar estado
  setToken(null);

  // redirigir al login
  window.location.href = "/";
};

  return (
  <BrowserRouter>

    <Routes>

      <Route
        path="/activar/:id"
        element={<Activar />}
      />

      <Route
        path="/"
        element={
          <div className={`app-container ${fondoClase}`}>
            <h1 className="titulo">
              {token
                ? role === "admin"
                  ? "Autenticación de Administrador"
                  : "Autenticación de Usuario"
                : "Sistema de Autenticación JWT"}
            </h1>

            {!token ? (
              mostrarRegistro ? (
                <Register
                  volverLogin={() =>
                    setMostrarRegistro(false)
                  }
                />
              ) : (
                <Login
                  setToken={setToken}
                  irRegistro={() =>
                    setMostrarRegistro(true)
                  }
                />
              )
            ) : (
              <>
                <ProductoLista token={token} />
                <Dashboard token={token} />
                <HistorialComponent token={token} />//agregado para mostrar el historial de sesiones

                {role === "admin" && (
                  <AdminUsuarios
                    token={token}
                  />
                )}
<button
  className="btn-logout"
  onClick={cerrarSesion}
>
  Cerrar sesión
</button>
              </>
            )}
          </div>
        }
      />

    </Routes>

  </BrowserRouter>
);
}

export default App;