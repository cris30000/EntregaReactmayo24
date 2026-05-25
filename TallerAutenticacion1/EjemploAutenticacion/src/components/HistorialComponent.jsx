import {
  useEffect,
  useState
} from "react";

import {
  obtenerSesiones
} from "../services/api";

function HistorialComponent({
  token
}) {

  const [
    sesiones,
    setSesiones
  ] = useState([]);

  const userId =
    localStorage.getItem(
      "userId"
    );

  useEffect(() => {
    cargarSesiones();
  }, []);

  const cargarSesiones =
    async () => {

      try {

        const res =
          await obtenerSesiones(
            userId,
            token
          );

        setSesiones(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="card">
      <h2>
        Historial de sesiones
      </h2>

      {sesiones.length ===
      0 ? (
        <p>
          No hay sesiones
        </p>
      ) : (
        sesiones.map(
          (sesion) => (
            <div
              key={sesion.id}
              className="producto"
            >
              <p>
                Inicio:
                {" "}
                {
                  sesion.timestamp
                }
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default HistorialComponent;