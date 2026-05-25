import {
  useEffect,
  useState
} from "react";

import {
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario
} from "../services/api";

function AdminUsuarios({
  token
}) {
  const [usuarios, setUsuarios] =
    useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios =
    async () => {
      try {
        const res =
          await obtenerUsuarios(
            token
          );

        setUsuarios(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const eliminar =
    async (id) => {
      if (
        confirm(
          "¿Eliminar usuario?"
        )
      ) {
        await eliminarUsuario(
          id,
          token
        );

        cargarUsuarios();
      }
    };

  const editar =
    async (usuario) => {
      const nuevoRol =
        prompt(
          "Nuevo rol (admin/user)",
          usuario.role
        );

      if (!nuevoRol) return;

      await actualizarUsuario(
        usuario.id,
        {
          role: nuevoRol
        },
        token
      );

      cargarUsuarios();
    };

  return (
    <div className="card">
      <h2>
        Administración de Usuarios
      </h2>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(
            (user) => (
              <tr key={user.id}>
                <td>
                  {user.id}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  <button
                    className="btn-edit"
                    onClick={() =>
                      editar(
                        user
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      eliminar(
                        user.id
                      )
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsuarios;