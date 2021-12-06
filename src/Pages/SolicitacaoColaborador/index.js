import React, { useEffect, useState } from "react";
import api from "../../services/api";
import HeaderColab from "../../components/header/HeaderColab";
import Arrow from "../../assets/img/arrow.png";
import DonwArrow from "../../assets/img/down-arrow.png";
import dayjs from "dayjs";
import "./styles.scss";
import TimeField from "react-simple-timefield";

const SolicitacaoColaborador = () => {
  const [data, setData] = useState("");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [observacao, setObs] = useState("");
  const [colaboradores_idcolaboradores, setIdcolaboradores] = useState([]);
  const [pontos_num_registro, setNumRegistro] = useState([]);
  const [ponto, setPonto] = useState([]);

  const maskDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const dados = {
      entrada,
      saida,
      data,
      observacao,
      pontos_num_registro,
      colaboradores_idcolaboradores,
    };
    if(data, observacao, saida, entrada === "") {
      alert("Preecha todos os campos!")
      return
    }
    if(entrada === saida) {
      alert("Entrada e saida não podem ser iguais!")
      return
    }
    if ((entrada !== "")  &  (saida !== "") & (data !== "") &  (observacao !== "")) {
      try {
        dados.data = editDate(dados.data);
        const token = localStorage.getItem("token");

        api.post(`/colaborador/solicitacoes`, dados, {
          headers: {
            Authorization: `Bearer ` + token,
          },
          
        });
        
      } catch (err) {
        alert("Por favor, tente novamente.");
      }
    } else {
      alert("Por favor preencher todos os campos!");
      return
    }
    alert("Solicitação feita com sucesso!");
    window.location.href = "/ponto-colaborador";
  }

  
  function editDate(date) {
    const partes = date.split("/");
    const dataPonto = partes[2] + "-" + partes[1] + "-" + partes[0];
    return dataPonto;
  }
  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  useEffect(() => {
    async function getSpot() {
      const url_string = window.location.href;
      const url = new URL(url_string);
      const id = url.searchParams.get("id");
      const token = localStorage.getItem("token");

      const response = await api.get(`/colaborador/pontos/numeroRegistro/${id}`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
     
      let res = [];
      res.push(response.data.response[0]);
      response.data.response[0].colaboradores_idcolaboradores =
        setIdcolaboradores(
          response.data.response[0].colaboradores_idcolaboradores
        );
      response.data.response[0].num_registro = setNumRegistro(
        response.data.response[0].num_registro
      );
      response.data.response[0].data = formatDate(
        response.data.response[0].data
      );
      setPonto(response.data.response[0]);
    }
    getSpot();
  }, []);

  return (
    <div>
      <HeaderColab />
      <div className="container-spot">
        <div className="info-spot">
         
          <div className="spot">
          <div className="content-title-spot">
            <p className="txt-title-spot">Ponto para ajustar</p>
          </div>
          <div className="spot-date">
          <p className="text-info-spot">Entrada:</p>
            <span className="text-span-spot">{ponto.entrada}</span>
            <p className="text-info-spot">Saida:</p>
            <span className="text-span-spot">{ponto.saida}</span>
            <p className="text-info-spot">Data:</p>
            <span className="text-span-spot">{ponto.data}</span>
          </div>
           
          </div>
          <div className="content-arrow">
            <img className="arrow" src={Arrow} alt="" />
            <img className="down-arrow" src={DonwArrow} alt="" />
          </div>
          <div className="container-inputs">
            <form className="form-spot" onSubmit={handleSubmit}>
              <div className="content-requests">
                <p className="text-info-spot">Entrada*</p>
                <TimeField
                  type="text"
                  name="entrada"
                  className="input-time"
                  placeholder = "00:00"
                  colon=":"
                  onChange={(e) => setEntrada(e.target.value)}
                />
              </div>
              <div className="content-requests">
                <p className="text-info-spot">Saida*</p>
              
                <TimeField 
                name="saida"
                className="input-time" 
                type="text"
                colon=":"
                 onChange={(e) => setSaida(e.target.value)}
                 mask="00:00:00"
                />
              </div>
              <div className="content-requests">
                <p className="text-info-spot">Data*</p>
                <input
                  type="text"
                  name="data"
                  className="input-date"
                  placeholder="00/00/0000"
                  value={data}
                  onChange={(e) => setData(maskDate(e.target.value))}
                />
              </div>
              <div className="content-requests">
                <p className="text-info-spot">Observação*</p>
                <input
                  className="input-observation"
                  type="text"
                  placeholder="Digite a observação"
                  onChange={(e) => setObs(e.target.value)}
                />
              </div>
              <button className="btn-request">Enviar Solicitação</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SolicitacaoColaborador;
