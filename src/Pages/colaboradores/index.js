import React, { Component } from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../Header";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";

class Colaboradores extends Component {
  state = {
    pessoas: [],
  };
  async componentDidMount() {
    const token = localStorage.getItem("admin_token");
    const response = await api.get("/colaboradores", {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    this.setState({ pessoas: response.data.response });
    console.log(response.data.response);
  }

  render() {
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

    const { pessoas } = this.state;
    return (
      <div>
        <Header />
        <div class="content-all">
          {pessoas.map((pessoa) => (
            <li class="content-people" key={pessoa.idcolaboradores}>
              <p>Nome:</p>
              <span>{pessoa.nome_completo}</span>
              <p>E-mail:</p>
              <span>{pessoa.email}</span>
              <p>Setor:</p> <span>{pessoa.setor}</span>
              <p>Telefone:</p> <span>{pessoa.telefone_celular}</span>
              <button
                class="button-delete"
                onClick={() => handleDelete(pessoa.idcolaboradores)}
              >
                <img src={Delete} alt="" />
              </button>
              <button class="button-edit">
                <img src={Edit} alt="" />
              </button>
            </li>
          ))}
        </div>
      </div>
    );
  }
}
export default Colaboradores;
