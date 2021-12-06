import React, { useEffect, useState } from "react";
import HeaderColab from "../../components/header/HeaderColab";
import "./styles.scss";
import api from "../../services/api";
import dayjs from "dayjs";

const Perfil = () => {
  const [pessoa, setPessoa] = useState("");
  
  function handlePerson(e) {
    setPessoa({
      ...pessoa,

      [e.target.name]: e.target.value,
    });
  }
 
  function handleSubmit(pessoa) {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
   
  if (pessoa.email.indexOf("@") === -1) {
    alert("Insira um email válido!");
    return;
  }
  if (pessoa.telefone_celular.length < 11 ) {
    alert("Insira um telefone celular válido!");
    return;
  }
    pessoa.data_admissao = editDate(pessoa.data_admissao);
    pessoa.data_nasc = editDate(pessoa.data_nasc);
    api.put(`/colaboradores/editar/${id}`, pessoa, {
        headers: {
          Authorization: `Bearer ` + token,
        },
    });
    alert("Perfil editado com sucesso!")
    window.location.href = "/ponto-colaborador"
 }
  function editDate(date) {
    const partes = date.split("-");
    const nascimento = partes[2] + "-" + partes[1] + "-" + partes[0];
    return nascimento;
  }

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    async function getPerson() {
      
      
      const response = await api.get(`/colaboradores/id/${id}`, {
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
    getPerson();
  }, []);
  return (
    <div>
      <HeaderColab />
      <div className="container-profile">
        <div className="content-profile">
          <div className="data-profile">
            <p className="txt-profile">Nome Completo</p>
            <input disabled
              defaultValue={pessoa.nome_completo}
              name="nome_completo"
              className="input-profile"
            />
          </div>
          <div className="data-profile">
            <p className="txt-profile">CPF</p>
            <input className="input-profile" disabled defaultValue={pessoa.cpf}/>
          </div>
          <div className="data-profile">
            <p className="txt-profile">Email</p>
            <input className="input-profile" defaultValue={pessoa.email} name="email" onChange={(event) => handlePerson(event)} />
          </div>
          <div className="data-profile">
            <p className="txt-profile">Telefone</p>
            <input className="input-profile" defaultValue={pessoa.telefone_celular}  name="telefone_celular" onChange={(event) => handlePerson(event)}/>
          </div>
          <div className="data-profile">
            <p className="txt-profile">Setor</p>
            <input className="input-profile" disabled defaultValue={pessoa.setor}/>
          </div>
        </div>
        <div className="content-profile-two">
          <div className="data-profile">
            <p className="txt-profile">Data Nascimento</p>
            <input className="input-profile" disabled defaultValue={pessoa.data_nasc}/>
          </div>
          <div className="data-profile">
            <p className="txt-profile">Data Admissão</p>
            <input className="input-profile" disabled defaultValue={pessoa.data_admissao} />
          </div>
          <div className="data-profile">
            <p className="txt-profile" >Endereco</p>
            <input className="input-profile" defaultValue={pessoa.endereco} name="endereco" onChange={(event) => handlePerson(event)}/>
          </div>
          <div className="data-profile">
            <p className="txt-profile">Número</p>
            <input className="input-profile" defaultValue={pessoa.numero} name="numero" onChange={(event) => handlePerson(event)}/>
          </div>
          <div className="data-profile">
            <p className="txt-profile">Horas Mensais</p>
            <input className="input-profile" disabled defaultValue={pessoa.horas_mensais}/>
          </div>
        </div>
          <div className="content-btn-save">
          <button className="btn-save" onClick={() => handleSubmit(pessoa)}>Salvar</button>
          </div>
      </div>
    </div>
  );
};
export default Perfil;
