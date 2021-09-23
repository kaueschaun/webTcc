import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import api from "../../services/api";

const Pontos = () => {
  const [pontos, setPontos] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api
      .get("/pontos", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        setPontos(response.data.response);
        console.log(response.data)
      });
  }, []);
  return (
    <div>
      <Header />
      <h2>2ea</h2>
      {pontos.map((ponto) => (
          <li class="content-people" key={ponto.colaboradores_idcolaboradores}>
            <p>Data:</p>
            <span>{ponto.colaboradores_idcolaboradores}</span>
            <span>{ponto.hora}</span>
            <span>{ponto.nome_completo}</span>
          </li>
        ))}
    </div>
  );
};
export default Pontos;
