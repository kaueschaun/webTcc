import React from "react";
import ReactDOM from "react-dom";
import api from "../../services/api";
import "./styles.scss";

const PontosColaborador = () => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const id = url.searchParams.get("id");

  function doPonto() {
    console.log(id);
    const payload = {
      colaboradores_idcolaboradores: id,
    };
    api
      .post("/pontos", payload)
      .then(({ data }) => {
        alert("Ponto Registrado!");
        window.location.href = "/solicitacoes-colaborador";
      })
      .catch((err) => alert("erro"));
  }

  function tick() {
    const element = (
      <div className="content-all">
        <div className="container">
          <div className="content-childrens">
            <div className="child-container">
              <a href="/solicitacoes-colaborador" className="btn-back">
                Voltar a Página Inicial
              </a>
            </div>

            <div className="content-two">
              <h2 className="txt-welcome">Hora Atual</h2>
              <h1 className="txt-time"> {new Date().toLocaleTimeString()}</h1>
              <button className="btn-register" onClick={() => doPonto()}>
                Marcar Ponto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    ReactDOM.render(element, document.getElementById("root"));
  }
  setInterval(tick, 1000);

  return (
    <div>
      <div id="root"></div>
    </div>
  );
};
export default PontosColaborador;
