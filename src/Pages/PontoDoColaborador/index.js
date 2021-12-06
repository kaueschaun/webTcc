import React, { useEffect, useState, ReactInputMask } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import dayjs from "dayjs";
import "./styles.scss";

import MaskedInput from "react-text-mask";

const PontoDoColaborador = () => {
  const [pontos, setPontos] = useState([]);
  const [noSpots, setNoSpots] = useState(false);
  const [SpotsReport, setNoSpotsReport] = useState(true);

  function editDate(date) {
    const partes = date.split("/");
    if (partes[2] === undefined && partes[1] == undefined) {
      return partes[0];
    }
    if (partes[1] !== undefined && partes[2] == undefined) {
      return partes[1] + "-" + partes[0];
    }
    if (partes[2] !== undefined) {
      return partes[2] + "-" + partes[1] + "-" + partes[0];
    }
  }
  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  const handleReport = () => {
    window.location.href = `/relatorio?id=${idcolaboradores}`;
  };
  const url_string = window.location.href;
  const url = new URL(url_string);
  const idcolaboradores = url.searchParams.get("id");
  const token = localStorage.getItem("admin_token");

  const getSpots = () => {
    api
      .get(`/pontos/${idcolaboradores}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
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
  };

  useEffect(() => {
    getSpots();
  }, []);

  const filterDate = (data) => {
    setPontos([]);
    const dataFilter = editDate(data);
    api
      .get(`/pontos/${idcolaboradores}/${dataFilter}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        if (response.data.response.length === 0) {
          setNoSpots(true);
          return;
        }
        if (response.data.response.length !== 0) {
          setNoSpots(false);
        }
        response.data.response.map(
          (ponto) => (ponto.data = formatDate(ponto.data))
        );
        setPontos(response.data.response);
      });
  };

  return (
    <div className="container-spots-all">
      <Header />
      <div className="content-spots-all">
        {SpotsReport && (
          <div className="content-btn-report">
            <button
              className="report-btn"
              onClick={() => handleReport(idcolaboradores)}
            >
              Relatório
            </button>
            <p className="title-search">Pesquisa de ponto por data <p className="two-spot">:</p></p>

            <MaskedInput
              className="field-search-data"
              placeholder="00/00/0000"
              onChange={(e) => filterDate(e.target.value)}
              mask={[
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
              ]}
            />
          </div>
        )}
        {noSpots && (
          <div className="no-spots">
            <h1 className="txt-no-spots">Não há pontos</h1>
          </div>
        )}
        <div className="content-collaborator-spots">
          {pontos.map((pontos) => (
            <li className="collaborator-spots" key={pontos.num_registro}>
              <div className="container-collaborator-spots">
                <p>Entrada:</p>
                <span>{pontos.entrada}</span>
                <p>Saida:</p>
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
