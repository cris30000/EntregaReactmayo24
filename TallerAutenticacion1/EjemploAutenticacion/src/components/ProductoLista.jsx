import { useEffect, useState } from "react";
import {
  obtenerProductos,
  eliminarProducto,
  actualizarProducto
} from "../services/api";


function ProductoLista({ token }) {
  const [productos, setProductos] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    cargarProductos();
  }, [token]);

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductos(token);
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    if (confirm("¿Eliminar producto?")) {
      await eliminarProducto(id, token);
      cargarProductos();
    }
  };

  const editar = async (producto) => {
    const nuevoNombre = prompt(
      "Nuevo nombre",
      producto.nombre
    );

    if (!nuevoNombre) return;

    await actualizarProducto(
      producto.id,
      {
        nombre: nuevoNombre
      },
      token
    );

    cargarProductos();
  };

  return (
    <div className="card">
      <h2>Productos</h2>

      {productos.map((product) => (
        <div
          className="producto"
          key={product.id}
        >
          <div>
            <strong>{product.nombre}</strong>
            <p>${product.precio}</p>
          </div>

          {role === "admin" && (
            <div>
              <button
                className="btn-edit"
                onClick={() =>
                  editar(product)
                }
              >
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() =>
                  eliminar(product.id)
                }
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductoLista;