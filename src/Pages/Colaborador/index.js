import React, { Component, useState, useEffect } from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../components/header/Header";
import MaskedInput from "react-text-mask";

const Colaborador = () => {
  const [pessoa, setPessoa] = useState("");
  function handlePerson(e) {
    console.log(e.target.name);
    setPessoa({
      ...pessoa,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(pessoa) {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get("id");
    const token = localStorage.getItem("admin_token");
    api.put(`/colaboradores/${id}`, pessoa, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    alert("Colaborador editado com sucesso!");
    window.location.href = "/colaboradores";
  }
  useEffect(() => {
    async function getPersonData() {
      const url_string = window.location.href;
      const url = new URL(url_string);
      const id = url.searchParams.get("id");
      const token = localStorage.getItem("admin_token");

      const response = await api.get(`/colaboradores/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      });
      let res = [];
      res.push(response.data.response[0]);
      console.log(res);
      setPessoa(response.data.response[0]);
    }

    getPersonData();
  }, []);

  return (
    <div className="content-person">
      <Header />
      <div className="container-people">
        <div className="content-people">
          <div className="data-people">
            <label className="txt-person">Nome</label>
            <input
              className="person-input"
              type="text"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.nome_completo}
              name="nome_completo"
            />
          </div>

          <div className="data-people">
            <label className="txt-person" htmlFor="">
              CPF
            </label>
            <input
              className="person-input"
              type="text"
              name="cpf"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.cpf}
              disabled
            />
          </div>

          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Email
            </label>
            <input
              className="person-input"
              type="text"
              name="email"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.email}
            />
          </div>
        </div>

        <div className="content-people">
          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Telefone Celular
            </label>
            <input
              className="person-input"
              type="text"
              name="telefone_celular"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.telefone_celular}
            />
          </div>

          <div className="data-people">
            <label className="txt-person">Data de Nascimento</label>
            <MaskedInput
              className="person-input"
              onChange={(event) => handlePerson(event)}
              name="data_nasc"
              defaultValue={pessoa.data_nasc}
              mask={[
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
              ]}
            />
          </div>
          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Endereco
            </label>
            <input
              className="person-input"
              type="text"
              name="endereco"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.endereco}
            />
          </div>
        </div>

        <div className="content-people">
          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Setor
            </label>
            <input
              className="person-input"
              type="text"
              name="setor"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.setor}
            />
          </div>

          <div className="data-people">
            <label className="txt-person">Data de Admissão:</label>
            <MaskedInput
              className="person-input"
              onChange={(event) => handlePerson(event)}
              name="data_admissao"
              defaultValue={pessoa.data_admissao}
              mask={[
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
              ]}
            />
          </div>

          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Horas Mensais
            </label>
            <input
              className="person-input"
              type="text"
              name="horas_mensais"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.horas_mensais}
            />
          </div>
        </div>
        <div className="content-btn">
          <button
            className="btn-submit-edit"
            onClick={() => handleSubmit(pessoa)}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Colaborador;