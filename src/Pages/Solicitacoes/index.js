import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import dayjs from "dayjs";
import "./styles.scss";

const Solicitacoes = () => {
  const [solicitacao, setSolicitacao] = useState([]);
  const [noRequest, setNoRequest] = useState(false);
  
  function editDate(date) {
    const partes = date.split("-");
    const dataPonto = partes[2] + "-" + partes[1] + "-" + partes[0];
    return dataPonto;
  }
  function formatDate(date) {
    return dayjs(date).format("DD-MM-YYYY");
  }
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api
      .get(`/solicitacoes`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        if (response.data.response.length === 0) {
          setNoRequest(true);
          return;
        }

        let count = 0;
       
        { 
          response.data.response.map((solicitacao) => {
            solicitacao.data = formatDate(solicitacao.data);
            if (solicitacao.edit !== null) {
              count++;
            }
            if (response.data.response.length === count) {
              setNoRequest(true);
            }
          });
        } 

        {
          response.data.response.map(
            (solicitacao) => (
              (solicitacao.pontos_num_registro =
                solicitacao.pontos_num_registro),
              (solicitacao.data = solicitacao.data),
              (solicitacao.hora = solicitacao.hora),
              (solicitacao.id = solicitacao.id),
              (solicitacao.edit = solicitacao.edit)
            )
          );
        }

        setSolicitacao(response.data.response);
      });
  }, []);

  async function acceptResquest({
    pontos_num_registro,
    data,
    hora,
    id,
  }) {
    const dados = {
      data,
      hora,
    };
    dados.data = editDate(dados.data);
    const token = localStorage.getItem("admin_token");
    const response = await api.put(`/pontos/` + pontos_num_registro, dados, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    if (response.status === 202) {
      alert("Solicitação aceita com sucesso!");
      await api.put(
        `/solicitacoes/` + id,
        { edit: "Aceita" },
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      window.location.reload();
    }
  }

  async function deleteRequest(id) {
    const token = localStorage.getItem("admin_token");
    if (window.confirm("Deseja realmente excluir essa solicitação?")) {
      const response = await api.delete("/solicitacoes/" + id, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      });
      if (response.status === 202) {
        alert("Solicitação removida com sucesso!");
        window.location.reload();
      } else {
        alert("Ocorreu um erro");
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="container-request">
        {noRequest && (
          <div className="no-request">
            <h1 className="txt-no-request">Não há solicitações</h1>
          </div>
        )}
        {solicitacao
          .filter((solicitacao) => solicitacao.edit === null)
          .map((solicitacao) => (
            <div className="contents-request">
              <li className="list-request" key={solicitacao.id}>
                <div className="info-request">
                  <p className="txt-request">Nome:</p>
                  <span className="txt-request-span">
                    {solicitacao.nome_completo}
                  </span>
                </div>

                <div className="info-request">
                  <p className="txt-request">Hora:</p>
                  <span className="txt-request-span">
                    {solicitacao.hora}
                  </span>
                </div>
                <div className="info-request">
                  <p className="txt-request">Data:</p>
                  <span className="txt-request-span">{solicitacao.data}</span>
                </div>
                <div className="info-request">
                  <p className="txt-request">Observação:</p>
                  <span className="txt-request-span">
                    {solicitacao.observacao}
                  </span>
                </div>
                <div className="info-request-btn">
                  <button
                    className="btn-accept"
                    onClick={() => acceptResquest(solicitacao)}
                  >
                    Aceitar
                  </button>
                  <button
                    className="btn-decline"
                    onClick={() => deleteRequest(solicitacao.id)}
                  >
                    Negar
                  </button>
                </div>
              </li>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Solicitacoes;
