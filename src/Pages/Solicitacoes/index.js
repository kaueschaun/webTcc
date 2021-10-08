import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import dayjs from "dayjs";
import "./styles.scss";

const Solicitacoes = () => {
  const [solicitacao, setSolicitacao] = useState([]);
  
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
          if(response.data.response.length === 0) {
            alert("Não há nenhuma solicitação!")
          }
        
        response.data.response.map(
          (solicitacao) => (solicitacao.data = formatDate(solicitacao.data))
        );
        setSolicitacao(response.data.response);
        console.log(response.data.response)
      });
  }, []);

  async function deleteRequest(id) {
    const token = localStorage.getItem("admin_token");
    if(window.confirm("Deseja realmente excluir essa solicitação?")) {
       const response = await api.delete("/solicitacoes/" + id, {
         headers: {
           Authorization: `Bearer ` + token,
         },
       });
       if (response.status === 202) {
         alert("Solicitação removida com sucesso!")
         window.location.reload();
       } else {
         alert("Ocorreu um erro")
       }
    }
  } 

  return (
    <div>
      <Header />
      <div className="container-request">
        {solicitacao.map((solicitacao) => (
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
                <span className="txt-request-span">{solicitacao.hora}</span>
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
                <button className="btn-accept">Aceitar</button>
                <button className="btn-decline" onClick={() => deleteRequest(solicitacao.id)}>Negar</button>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Solicitacoes;
