import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/header/Header";
import "./styles.scss";


const Relatorio = () => {
  const [report, setReport] = useState([]);
  const [horas_mensais, setHoras_mensais] = useState("");
  const [horas_faltantes, setFaltantes] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [noReport, setNoReport] = useState(false);
  const [horas_feitas, setFeitas] = useState("");
  const [noRequestReport, setRequestReport] = useState(false)
  const [saldo, setSaldo] = useState("");

  const url_string = window.location.href;
  const url = new URL(url_string);
  const colaboradores_idcolaboradores = url.searchParams.get("id");
  const token = localStorage.getItem("admin_token");

  function editDate(date) {
    const partes = date.split("/");
    const dataPonto = partes[2] + "-" + partes[1] + "-" + partes[0];
    return dataPonto;
  }
  const maskDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataFilterInicio = editDate(dataInicio);
    const dataFilterFinal = editDate(dataFinal);

    const converter = Date.parse(dataFilterInicio);
    const converterTwo = Date.parse(dataFilterFinal);

    if (converter < converterTwo) {
      api
        .get(
          `/pontos/relatorio/${colaboradores_idcolaboradores}/${dataFilterInicio}/${dataFilterFinal}`,
          {
            headers: {
              Authorization: `Bearer ` + token,
            },
          }
        )
        .then((response) => {
          
          if(response.data.response.resultado.length === 0) {
            setRequestReport(true)
            return
          }
          setReport(response.data.response);
          const calculo =
            response.data.response.resultado[0].horas_mensais -
            parseInt(response.data.response.total_horas_mes);

          if (calculo < 0) {
            setFaltantes(0);
          } else {
            setFaltantes(calculo);
          }

          if (
            response.data.response.resultado[0].horas_mensais <
            response.data.response.total_horas_mes
          ) {
            const calculo_saldo =
              response.data.response.total_horas_mes -
              response.data.response.resultado[0].horas_mensais;
            setSaldo(calculo_saldo);
          } else {
            setSaldo(0);
          }
          setHoras_mensais(response.data.response.resultado[0].horas_mensais);
          setFeitas(response.data.response.total_horas_mes);
          setNoReport(true);
        });
    } else {
      alert("Preencha os Campos corretamente!");
    }
   
  };
  return (
    <div>
      <Header />
      <div className="container-report">
        <h1 className="title-report">
          Escolha as datas para gerar o Relatório
        </h1>
        <form onSubmit={handleSubmit}>
        <p className="txt-between-inputs">De</p>
          <input
            className="inputs-data-filter"
            value={dataInicio}
            onChange={(e) => setDataInicio(maskDate(e.target.value))}
            ></input>
          <p className="txt-between-inputs">à</p>
          <input
            className="inputs-data-filter"
            value={dataFinal}
            onChange={(e) => setDataFinal(maskDate(e.target.value))}
            ></input>
          <button className="btn-submit-report">Gerar Relatório</button>
        </form>
            {noRequestReport && (
              <div><h1 className="txt-noReport">Não pontos há pontos para gerar o Relatório ou as datas estão incorretas!</h1></div>
            )
            }
        {noReport && (
          <div className="results-report">
            <div className="content-results-report">
              <h1 className="title-results">Relatório</h1>
              <p className="txt-results-report">Horas Estipuladas</p>
              <p>{horas_mensais} Horas</p>
              <p className="txt-results-report">Horas Feitas</p>
              <p>{horas_feitas} Horas</p>
              <p className="txt-results-report">Horas Faltantes</p>
              <p>{horas_faltantes} Horas</p>
              <p className="txt-results-report">Saldo de Horas Extras</p>
              <p >{saldo} Horas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Relatorio;
