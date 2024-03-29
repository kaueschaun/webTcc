import React, { useEffect, useState } from "react";
import HeaderColab from "../../components/header/HeaderColab";
import api from "../../services/api";
import dayjs from "dayjs";
import DownArrow from "../../assets/img/down-arrow.png";
import "./styles.scss";

const SolicitacoesColaborador = () => {
  const [solicitacao, setSolicitacao] = useState([]);
  const [noRequest, setNorequest] = useState(false);
  const [accept, setAccept] = useState(true);

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    api
      .get(`/colaborador/solicitacoes/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        if (response.data.response.length === 0) {
          setNorequest(true);
          return;
        }
        if (response.data.response.edit === "Aceita") {
          setAccept(false);
        }
        response.data.response.map((solicitacao) => {
          solicitacao.data = formatDate(solicitacao.data);
          solicitacao.pontosData = formatDate(solicitacao.pontosData);
        });
        setSolicitacao(response.data.response);
      });
  }, []);

  return (
    <div>
      <HeaderColab />
      <div className="container-request-colab">
        {noRequest && (
          <div className="no-request">
            <h1 className="txt-no-request">Você não possui solicitações</h1>
          </div>
        )}

        {solicitacao.map((solicitacao) => (
          <div className="content-all-request">
            <li
              class="container-my-request"
              key={solicitacao.pontos_num_registro}
            >
              <fieldset class="content-data-my-request">
                <legend>Dados do Ponto</legend>
                <p>Entrada:</p>
                <span>{solicitacao.pontosEntrada}</span>
                <p>Saida:</p>
                <span>{solicitacao.pontosSaida}</span>
                <p>Data:</p>
                <span>{solicitacao.pontosData}</span>
              </fieldset>
              <div>
                <img className="down-arrow" src={DownArrow} alt="" /></div>
              <fieldset class="content-data-my-request">
                <legend>Dados da Solicitação</legend>
                <p>Entrada:</p>
                <span>{solicitacao.entrada}</span>
                <p>Saida:</p>
                <span>{solicitacao.saida}</span>
                <p>Data:</p>
                <span>{solicitacao.data}</span>
                <p>Observação:</p>
                <span>{solicitacao.observacao}</span>
                {accept && <span className="accept">{solicitacao.edit}</span>}
              </fieldset>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SolicitacoesColaborador;
