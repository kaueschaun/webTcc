import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import "./styles.scss";

const Pontos = () => {
  const handlePontos = (idcolaboradores) => {
    window.location.href = `/ponto-do-colaborador?id=${idcolaboradores}`;
  };
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    api
      .get("/colaboradores", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setColaboradores(res.data.response);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="content-all">
        {colaboradores.map((res) => (
          <div className="spots-content">
            <li className="spots-list">
              <div className="list-collaborator">
                <div className="content-collaborator">
                  <p>Nome:</p>
                  <span className="txt-spots">{res.nome_completo}</span>
                </div>
                <div className="content-collaborator">
                  <p>Setor:</p>
                  <span className="txt-spots">{res.setor}</span>
                </div>
                
                <div className="content-collaborator">
                  <button className="btn-spots" onClick={() => handlePontos(res.idcolaboradores)}>
                    Ver pontos
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Pontos;
