import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  activarUsuario
} from "../services/api";

function Activar() {
  const { id } =
    useParams();

  const [mensaje, setMensaje] =
    useState(
      "Activando..."
    );

  useEffect(() => {
    activar();
  }, []);

  const activar =
    async () => {
      try {
        await activarUsuario(
          id
        );

        setMensaje(
          "Cuenta activada"
        );
      } catch (error) {
        setMensaje(
          "Error al activar"
        );
      }
    };

  return (
    <div className="card">
      <h2>
        {mensaje}
      </h2>
    </div>
  );
}

export default Activar;