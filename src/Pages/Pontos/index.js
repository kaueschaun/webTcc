import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";
import "./styles.scss";

const Pontos = () => {
  
  const [noRequest, setRequest] = useState(false)
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

  const handleSearch = (nome_completo) => {
    setColaboradores([])
    const token = localStorage.getItem("admin_token");
    api
    .get(`/colaboradores/${nome_completo}`, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((response) => {
      if(response.data.response.length === 0 ) {
        setRequest(true)
        return
      }
        setRequest(false)
        setColaboradores(response.data.response)
    });
  
  }

  return (
    <div>
      <Header />
      <div className="content-all">
        <div className="container-search">
        <div className="content-search">
          <p className="txt-search">Pesquisa por nome:</p>
          <input
            className="input-search"
            placeholder="Pesquisar"
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </div>
        </div>
      
        {noRequest && (
          <div className="no-request">
            <h1 className="txt-no-request">
              Não há nenhum colaborador!
            </h1>
          </div>
        )}
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
