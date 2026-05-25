import "./Dashboard.css";


import {
  useEffect,
  useState
} from "react";

import {
  obtenerDashboard
} from "../services/api";

function Dashboard({ token }) {

  const [datos, setDatos] =
    useState(null);

  const userId =
    localStorage.getItem(
      "userId"
    );

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard =
    async () => {
      try {

        const res =
          await obtenerDashboard(
            userId,
            token
          );

        setDatos(
          res.data[0]
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!datos)
    return (
      <p className="loading">
        Cargando dashboard...
      </p>
    );

  return (
    <div className="card">

      <h2>Dashboard</h2>

      {/* Tarjetas estadísticas */}
      <div className="dashboard-grid">

        <div className="stat-card">
          <h3>🛒 Compras</h3>
          <p>
            {datos.compras}
          </p>
        </div>

        <div className="stat-card">
          <h3>📊 Estadística</h3>
          <p>
            {datos.estadistica}
          </p>
        </div>

      </div>

      {/* Lista productos */}
      <div className="lista-compras">

        <h3>
          Productos comprados
        </h3>

        <ul>
          {datos.productosComprados.map(
            (p, i) => (
              <li key={i}>
                {p}
              </li>
            )
          )}
        </ul>

      </div>

    </div>
  );
}

export default Dashboard;