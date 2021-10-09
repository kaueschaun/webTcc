import React, { useEffect, useState } from "react";
import api from "../../services/api";
import dayjs from "dayjs";
import solicitacao from "../../assets/img/solicitacao.png";
import HeaderColab from "../../components/header/HeaderColab";
import "./styles.scss";

const PontoColaborador = () => {
  const [ponto, setPonto] = useState([]);

  function toSendSpot(num_registro) {
    window.location.href = `/solicitacao-colaborador?id=${num_registro}`;
  }

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    api
      .get(`/colaborador/pontos/id/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        res.data.response.map((ponto) => (ponto.data = formatDate(ponto.data)));
        setPonto(res.data.response);
      });
  }, []);

  return (
    <div className="container">
      <HeaderColab />
      <div className="content-spots">
        {ponto.map((res) => (
          <li className="spots-list" key={res.num_registro}>
            <div className="container-spots">
              <p>Hora:</p>
              <span className="txt-spots">{res.hora}</span>
              <p>Data:</p>
              <span className="txt-data">{res.data}</span>
              <button
                className="btn-solicitacao"
                onClick={() => toSendSpot(res.num_registro)}
              >
                <img src={solicitacao} alt="" />
                <p>Solicitação</p>
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};
export default PontoColaborador;
