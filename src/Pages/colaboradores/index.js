import React, { useEffect, useState } from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../components/header/Header";
import Edit from "../../assets/img/edit.png";
import Delete from "../../assets/img/delete.png";

const Colaboradores = () => {
  const [pessoas, setPessoas] = useState([]);
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
