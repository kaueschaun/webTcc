import React, { useEffect, useState } from "react";
import api from "../../services/api";
import dayjs from "dayjs";
import solicitacao from "../../assets/img/solicitacao.png";
import HeaderColab from "../../components/header/HeaderColab";
import "./styles.scss";
import MaskedInput from "react-text-mask";

const PontoColaborador = () => {
  const [ponto, setPonto] = useState([]);
  const [noSpots, setNoSpots] = useState(false);
  const [noDateSpots, setNoDateSpots] = useState(true);

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

  function toSendSpot(num_registro) {
    window.location.href = `/solicitacao-colaborador?id=${num_registro}`;
  }

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const getSpots = () => {
    api
    .get(`/colaborador/pontos/id/${id}`, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((response) => {
      if (response.data.response.length === 0) {
        setNoSpots(true);
        setNoDateSpots(false)
      }
      response.data.response.map((ponto) => (ponto.data = formatDate(ponto.data)));
      setPonto(response.data.response);
    });
  }
  useEffect(() => {
   getSpots()
  }, []);
  
  const filterDate = (data) => {
    setPonto([]);
    const dataFilter = editDate(data);
    if(!data.length) {
      getSpots()
      return
    }

    api
      .get(`/colaborador/pontos/${id}/${dataFilter}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        if (response.data.response.length === 0) {
          setNoSpots(true);
          
        }
        if (response.data.response.length !== 0) {
          
          setNoSpots(false);
        }
        response.data.response.map(
          (ponto) => (ponto.data = formatDate(ponto.data))
        );
        setPonto(response.data.response);
      });
  };

  return (
    <div className="container">
      <HeaderColab />
      <div className="content-spots">
        {noDateSpots && <div className="content-search-data">
          <p className="title-search">Pesquisa de ponto por data:</p>
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
        </div>}

        {noSpots && (
          <div className="content-noSpots">
            <h1 className="txt-noSpots">Você não possui pontos</h1>
          </div>
        )}
        {ponto.map((res) => (
          <li className="spots-list" key={res.num_registro}>
            <div className="container-spots">
              <p>Entrada:</p>
              <span className="txt-spots">{res.entrada}</span>
              <p>Saida:</p>
              <span className="txt-spots">{res.saida}</span>
              <p>Data:</p>
              <span className="txt-data">{res.data}</span>
              <button
                className="btn-solicitacao"
                onClick={() => toSendSpot(res.num_registro)}
              >
                <img
                  className="img-solicitacao"
                  src={solicitacao}
                  alt="Solicitação"
                />
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
