import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import dayjs from "dayjs";
import "./styles.scss"

const PontoDoColaborador = () => {
  const [pontos, setPontos] = useState([]);
  const [noSpots, setNoSpots] = useState(false);
  const [noSpotsReport, setNoSpotsReport] = useState(true);

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  const handleReport = () => {
    window.location.href = `/relatorio?id=${idcolaboradores}`;
  };
  const url_string = window.location.href;
  const url = new URL(url_string);
  const idcolaboradores = url.searchParams.get("id");
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
   
    api
      .get(`/pontos/${idcolaboradores}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        console.log(response.data.response)
        if (response.data.response.length === 0) {
          setNoSpotsReport(false);
          setNoSpots(true);
          return;
        }
        response.data.response.map(
          (pontos) => (pontos.data = formatDate(pontos.data)),
          (pontos) => (pontos.entrada = dayjs("HH:mm:ss").format("HH:mm:ss"))
        );
        setPontos(response.data.response);
      });
  }, []);

  return (
    <div className="container-spots-all">
      <Header />
      <div className="content-spots-all">
        {noSpotsReport && (
        <div className="content-btn-report" >
          <button className="report-btn" onClick={() => handleReport(idcolaboradores)}>Relatório</button>
        </div>)}
      
        {noSpots && (
          <div className="no-spots">
            <h1 className="txt-no-spots">Não há pontos</h1>
          </div>
        )}
        <div className="content-collaborator-spots">
          {pontos.map((pontos) => (
            <li className="collaborator-spots" key={pontos.num_registro}>
              <div className="container-collaborator-spots">
                <p>Hora de Entrada:</p>
                <span>{pontos.entrada}</span>
                <p>Hora de Saida:</p>
                <span>{pontos.saida}</span>
                <p>Data:</p>
                <span>{pontos.data}</span>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PontoDoColaborador;
