import React, { useEffect, useState} from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../components/header/Header";
import Edit from "../../assets/img/edit.png";
import Delete from "../../assets/img/delete.png";
import dayjs from "dayjs";
import Accordion from 'react-bootstrap/Accordion'



const Colaboradores = () => {
  const [pessoas, setPessoas] = useState([]);
  const [noRequest, setRequest] = useState(false)
  const msk = require("msk");

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api
      .get("/colaboradores", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
       
        response.data.response.map((pessoas) => (pessoas.data_nasc = formatDate(pessoas.data_nasc)))
        response.data.response.map((pessoas) => (pessoas.data_admissao = formatDate(pessoas.data_admissao)))
        setPessoas(response.data.response);
      
      });
  }, []);

  const handleSearch = (nome_completo) => {
    setPessoas([])
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
        setPessoas(response.data.response)
    });
  
  }

  const handleEdit = (idcolaboradores) => {
    window.location.href = `/colaborador?id=${idcolaboradores}`;
  }

   async function handleDelete(idcolaboradores)  {
    const token = localStorage.getItem("admin_token");
    if (window.confirm("Deseja realmente excluir esse usuario?")) {
      var result = await api.delete("/colaboradores/" + idcolaboradores, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      });
      if (result.status === 202) {
        window.location.href = "/colaboradores";
      } else {
        alert("Ocorreu um erro");
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="content-all">
        <div className="content-search">
          <p className="txt-search">Pesquisa por nome:</p>
          <input
            className="input-search"
            placeholder="Pesquisar"
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </div>
        {noRequest && (
          <div className="no-request">
            <h1 className="txt-no-request">
              Não há nenhum colaborador com esse nome!
            </h1>
          </div>
        )}
        {pessoas.map((pessoa, index) => (
          <Accordion className="content-people" key={pessoa.idcolaboradores}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header className="header-accordion">
                {/* <div> */}
                  <p>Nome:</p>
                  <span>{pessoa.nome_completo}</span>
                {/* </div> */}
                {/* <div> */}
                  {" "}
                  <p>E-mail:</p>
                  <span>{pessoa.email}</span>
                {/* </div> */}
                {/* <div> */}
                  {" "}
                  <p>Setor:</p> <span>{pessoa.setor}</span>
                {/* </div> */}
                {/* <div> */}
                  <p>Telefone:</p>{" "}
                  <span>
                    {msk.fit(pessoa.telefone_celular, "(99) 99999-9999")}
                  </span>
                {/* </div> */}
                {/* <div> */}
                <button
                  className="button-delete"
                  onClick={() => handleDelete(pessoa.idcolaboradores)}
                >
                  <img src={Delete} alt="Delete" />
                </button>
                <button
                  onClick={() => handleEdit(pessoa.idcolaboradores)}
                  className="button-edit"
                >
                  <img src={Edit} alt="Edit" />
                </button>
                {/* </div> */}

                
              </Accordion.Header>
              <Accordion.Body>
                <p>CPF:</p>
                <span>{msk.fit(pessoa.cpf, "999.999.999-99")}</span>
                <p>Data de Nascimento:</p>
                <span>{pessoa.data_nasc}</span>
                <p>Data de Admissão:</p>
                <span>{pessoa.data_admissao}</span>
                <p>Endereço:</p>
                <span>{pessoa.endereco}</span>
                <p>Número:</p>
                <span>{pessoa.numero}</span>
                <p>Horas mensais:</p>
                <span>{pessoa.horas_mensais}</span>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
export default Colaboradores;
