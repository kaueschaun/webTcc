import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./styles.scss";
import "./../../Header.js";
import MaskedInput from "react-text-mask";
import api from "../../services/api";
import Header from "./../../Header.js";

export default function Cadastro() {
  const token = localStorage.getItem("admin_token");
  const [nome_completo, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [data_admissao, setAdmissao] = useState("");
  const [telefone_celular, setTelefone] = useState("");
  const [horas_mensais, setHoras_mensais] = useState("");
  const [setor, setSetor] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const partes = data_nasc.split("/");
    const nascimento = partes[2] + "-" + partes[1] + "-" + partes[0];
    const parts = data_admissao.split("/");
    const admissao = parts[2] + "-" + parts[1] + "-" + parts[0];

    const dados = {
      nome_completo,
      cpf,
      data_nasc: nascimento,
      email,
      endereco,
      numero,
      data_admissao: admissao,
      telefone_celular,
      setor,
      horas_mensais,
      senha,
    };
    console.log(dados);

    if (nome_completo.indexOf(" ") === -1) {
      alert("Inserir nome completo");
      setNome("");
      return;
    }
    if (cpf.substr(13, 1) === "_") {
      alert("Inserir o CPF corretamente");
      setCpf("");
      return;
    }
    if (data_nasc.substr(9, 1) === "_") {
      alert("Inserir a data de nascimento corretamente");
      setData_nasc("");
      return;
    }
    if (email.indexOf("@") === -1) {
      alert("Inserir um email válido");
      setEmail("");
      return;
    }
    if (telefone_celular.substr(14, 1) === "_") {
      alert("Inserir o whatsapp corretamente");
      setTelefone("");
      return;
    }

    if (
      (nome_completo !== "") &
      (cpf !== "") &
      (data_nasc !== "") &
      (email !== "") &
      (telefone_celular !== "") &
      (setor !== "") &
      (data_admissao !== "") &
      (horas_mensais !== "") &
      (senha !== "")
    ) {
      try {
        await api.post("/colaboradores", dados, {
          headers: {
            Authorization: `Bearer ` + token,
          },
        });

        alert("Cadastro Realizado com Sucesso.");
        history.push("/");
      } catch (err) {
        console.log(err);
        alert("Por favor, tente novamente.");
      }
    } else {
      alert("Por favor preencher os campos corretamente.");
    }
  }

  return (
    <div class="containerAll">
      <Header />

      <div class="container">
        <h1 class="title">Cadastro</h1>

        <div class="content-input">
          <div class="content-fields">
            <p class="title-input">Nome Completo:</p>
            <input class="field-input"></input>
          </div>

          <div class="content-fields">
            <p class="title-input">CPF:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Data de Nascimento:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">E-mail:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Endereço:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Número:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Data de Admissão:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Setor:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Horas Mensais:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Telefone Celular:</p>
            <input class="field-input"></input>
          </div>
          <div class="content-fields">
            <p class="title-input">Senha:</p>
            <input class="field-input"></input>
          </div>
        </div>
        <div class="contentButton">
          <button>CADASTRAR</button>
        </div>
      </div>
    </div>
  );
}

//    return (
//     <div id="cont">
//       <ul class="nav justify-content-end">
//         <h1 id="Title">Cadastro de Colaborador</h1>
//       </ul>
//       <form id="container" onSubmit={handleRegister}>
//         <p id="txtNome">Nome completo</p>
//         <input
//           id="input"
//           placeholder="Nome Completo"
//           onChange={(e) => setNome(e.target.value)}
//         />
//         <p id="txtCad">CPF</p>
//         <input
//           id="input"
//           placeholder="CPF"
//           onChange={(e) => setCpf(e.target.value)}
//           maxLength="11"
//         />
//         <p id="txtCad">Data de Nascimento</p>
//         <MaskedInput
//           id="input"
//           placeholder="Data de Nascimento"
//           onChange={(e) => setData_nasc(e.target.value)}
//           mask={[
//             /[0-9]/,
//             /[0-9]/,
//             "/",
//             /[0-9]/,
//             /[0-9]/,
//             "/",
//             /[0-9]/,
//             /[0-9]/,
//             /[0-9]/,
//             /[0-9]/,
//           ]}
//         />
//         <p id="txtCad">E-mail</p>
//         <input
//           id="input"
//           placeholder="E-mail"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <p id="txtCad">Endereço</p>
//         <input
//           id="inputEndereco"
//           placeholder="Endereço"
//           onChange={(e) => setEndereco(e.target.value)}
//         />

//         <p id="txtNumero">Número</p>
//         <input
//           id="inputNumero"
//           placeholder="Número"
//           onChange={(e) => setNumero(e.target.value)}
//         />
//         <p id="txtAd">Data de Admissão</p>
//         <MaskedInput
//           id="inputAd"
//           placeholder="Data de Admissão"
//           onChange={(e) => setAdmissao(e.target.value)}
//           mask={[
//             /[0-9]/,
//             /[0-9]/,
//             "/",
//             /[0-9]/,
//             /[0-9]/,
//             "/",
//             /[0-9]/,
//             /[0-9]/,
//             /[0-9]/,
//             /[0-9]/,
//           ]}
//         />
//         <p id="txtAd">Setor</p>
//         <input
//           id="inputAd"
//           placeholder="Setor"
//           onChange={(e) => setSetor(e.target.value)}
//         />
//         <p id="txtAd">Horas Mensais</p>
//         <input
//           id="inputAd"
//           placeholder="Horas Mensais"
//           onChange={(e) => setHoras_mensais(e.target.value)}
//         />
//         <p id="txtTel">Telefone Celular</p>
//         <input
//           id="inputTel"
//           placeholder="Telefone"
//           onChange={(e) => setTelefone(e.target.value)}
//           maxLength="11"
//         />
//         <p id="txtSen">Senha</p>
//         <input
//           id="inputSenha"
//           placeholder="Senha"
//           type="password"
//           onChange={(e) => setSenha(e.target.value)}
//         />
//         <button id="btnCad">Cadastrar</button>
//       </form>
//     </div>
//   );
//  }
