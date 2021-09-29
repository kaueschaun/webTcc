import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import dayjs from "dayjs";
import "./styles.scss";

const Pontos = () => {
  function formatDate(date) {
    return dayjs(date).format("DD-MM-YYYY");
  }
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api
      .get("/pontos", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        res.data.response.map(
          (pontos) => (pontos.data = formatDate(pontos.data))
        );
        setPontos(res.data.response);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="content-all">
        {pontos.map((res) => (
          <div>
            <li className="spots-list" key={res.num_registro}>
              <p>Nome:</p>
              <span className="txt-spots">{res.nome_completo}</span>
              <p>Data:</p>
              <span className="txt-spots">{res.data}</span>
              <p>Hora:</p>
              <span className="txt-spots">{res.hora}</span>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Pontos;
