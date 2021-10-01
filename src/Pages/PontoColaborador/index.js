import React, { useEffect, useState }  from "react";
import api from "../../services/api";
import dayjs from "dayjs";
import HeaderColab from "../../components/header/HeaderColab";
import "./styles.scss";
const PontoColaborador = () => {
    const [ponto, setPonto] = useState([]);

    function formatDate(date) {
        return dayjs(date).format("DD-MM-YYYY");
    }
      useEffect(() => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem("token");
            api
              .get(`/pontos/${id}`, {
                headers: {
                  Authorization: `Bearer ` + token,
                },
              })
              .then((res) => {
                res.data.response.map(
                    (ponto) => (ponto.data = formatDate(ponto.data))
                  );
                setPonto(res.data.response);
              });
    }, []); 

    return (
      <div>
        <HeaderColab />
        <div className="content-all">
          {ponto.map((res) => (
            <div className="container-spots">
              <li className="spots-list" key={res.num_registro}>
                <p>Hora:</p>
                <span className="txt-spots">{res.hora}</span>
                <p>Data:</p>
                <span className="txt-spots">{res.data}</span>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
};
export default PontoColaborador;