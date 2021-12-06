import React, { useState, useEffect } from "react";
import "./styles.scss";
import api from "../../services/api";
import Header from "../../components/header/Header";
import MaskedInput from "react-text-mask";
import dayjs from "dayjs";

const Colaborador = () => {
  const [pessoa, setPessoa] = useState("");

  function handlePerson(e) {
    setPessoa({
      ...pessoa,

      [e.target.name]: e.target.value,
    });
  }

  function editDate(date) {
    const partes = date.split("-");
    const nascimento = partes[2] + "-" + partes[1] + "-" + partes[0];
    return nascimento;
  }

  function formatDate(date) {
    return dayjs(date).format("DD-MM-YYYY");
  }

  function handleSubmit(pessoa) {
    if (pessoa.telefone_celular.length < 11 || pessoa.telefone_celular === "") {
      alert("Telefone precisa de no minimo 11 digitos!");
      return;
    }
    if (pessoa.email.indexOf("@") === -1) {
      alert("Inserir um email válido");
      return;
    }
    pessoa.data_admissao = editDate(pessoa.data_admissao);
    pessoa.data_nasc = editDate(pessoa.data_nasc);
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
      response.data.response[0].data_nasc = formatDate(
        response.data.response[0].data_nasc
      );
      response.data.response[0].data_admissao = formatDate(
        response.data.response[0].data_admissao
      );
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
              value={pessoa.cpf}
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
              value={pessoa.email}
            />
          </div>
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
              name="data_nasc"
              disabled
              defaultValue={pessoa.data_nasc}
              mask={[
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
              ]}
            />
          </div>
        </div>

        <div className="content-people-two">
          <div className="data-people">
            <label className="txt-person">Data de Admissão</label>
            <MaskedInput
              className="person-input"
              name="data_admissao"
              disabled
              defaultValue={pessoa.data_admissao}
              mask={[
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
                "/",
                /[0-9]/,
                /[0-9]/,
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
          <div className="data-people">
            <label className="txt-person" htmlFor="">
              Número
            </label>
            <input
              className="person-input"
              type="text"
              name="numero"
              onChange={(event) => handlePerson(event)}
              defaultValue={pessoa.numero}
            />
          </div>
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
