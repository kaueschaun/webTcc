import React, { useEffect, useState} from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../components/header/Header";
import Edit from "../../assets/img/edit.png";
import Delete from "../../assets/img/delete.png";

const Colaboradores = () => {
  const [pessoas, setPessoas] = useState([]);
  const [noRequest, setRequest] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api
      .get("/colaboradores", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        setPessoas(response.data.response);
      });
  }, []);
  
  function handleSearch(nome_completo) {
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

  function handleEdit(idcolaboradores) {
    window.location.href = `/colaborador?id=${idcolaboradores}`;
  }

  async function handleDelete(idcolaboradores) {
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
        <div className="content-search"><p className="txt-search">Pesquisa por nome:</p><input className="input-search" placeholder="Pesquisar" onChange={(e) => handleSearch(e.target.value)}></input></div>
        { noRequest && <div className="no-request"><h1 className="txt-no-request" >Não há nenhum colaborador com esse nome!</h1></div>}
        {pessoas.map((pessoa) => (
          <li className="content-people" key={pessoa.idcolaboradores}>
            <p>Nome:</p>
            <span>{pessoa.nome_completo}</span>
            <p>E-mail:</p>
            <span>{pessoa.email}</span>
            <p>Setor:</p> <span>{pessoa.setor}</span>
            <p>Telefone:</p> <span>{pessoa.telefone_celular}</span>
            <button
              className="button-delete"
              onClick={() => handleDelete(pessoa.idcolaboradores)}
            >
              <img src={Delete} alt="" />
            </button>
            <button
              onClick={() => handleEdit(pessoa.idcolaboradores)}
              class="button-edit"
            >
              <img src={Edit} alt="" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
export default Colaboradores;
