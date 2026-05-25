import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// LOGIN
export const login = (data) =>
  API.post("/login", data);

// REGISTAR 
export const register = (data) =>
  API.post("/register", data);

// OBTENER PRODUCTOS
export const obtenerProductos = (token) => {
  return API.get("/productos", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ELIMINAR PRODUCTO
export const eliminarProducto = (
  id,
  token
) => {
  return API.delete(
    `/productos/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

// ACTUALIZAR PRODUCTO
export const actualizarProducto = (
  id,
  data,
  token
) => {
  return API.patch(
    `/productos/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
/// OBTENER USUARIOS
export const obtenerUsuarios = (token) => {
  return API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ELIMINAR USUARIO
export const eliminarUsuario = (
  id,
  token
) => {
  return API.delete(
    `/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

// ACTUALIZAR USUARIO
export const actualizarUsuario = (
  id,
  data,
  token
) => {
  return API.patch(
    `/users/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

// opara activar usuario
export const activarUsuario =
  (id) => {
    return API.patch(
      `/users/${id}`,
      {
        activo: true
      }
    );
  };
  // PARA DSHBOARD
  export const obtenerDashboard =
  (userId, token) => {

    return API.get(
      `/dashboard?userId=${userId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};
// GUARDAR SESION
export const crearSesion = (
  data,
  token
) => {
  return API.post(
    "/sesiones",
    data,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
};

// OBTENER HISTORIAL
export const obtenerSesiones =
  (
    userId,
    token
  ) => {
    return API.get(
      `/sesiones?userId=${userId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};