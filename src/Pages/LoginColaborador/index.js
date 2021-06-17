import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

import MaskInput from "../../InputMasked";
import logo2 from "../../assets/logo2.png";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  async function handleLogin() {
    const payload = {
      cpf,
      senha,
    };
    api
      .post("/colaboradores/login/colaborador", payload)
      .then(({ data }) => {
        console.log("entrou no then" + data);
        localStorage.setItem("token", data.token);
        history.push("/solicitacoes/colaborador");
      })
      .catch((err) => alert("Senha ou CPF Incorreto"));
  }

  return (
    <div id="contAll">
      <div id="header">
        {" "}
        <ul class="header">
          <img alt="Logo Header" id="logo" src={logoImg}></img>
        </ul>
      </div>

      <div id="contTwo">
        <div id="divBem">
          <h1 id="h1Bem">Bem-vindo</h1>
          <h1 id="horacerta"> ao Hora Certa</h1>
        </div>
      </div>
      <div id="contThree">
        <div id="divInput">
          <div id="divImg">
            <img id="image" alt="Logo Adm" src={logo2}></img>
            <h1 id="h1Two">Login</h1>
            {/* <h1 id="h1Adm">do Administrador</h1> */}
          </div>

          <form id="form">
            <MaskInput
              value={cpf}
              placeholder="CPF"
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              id="senha"
              type="password"
              placeholder="SENHA"
              value={senha}
              maxLength="8"
              onChange={(e) => setSenha(e.target.value)}
            />

            <button id="btn" type="button" onClick={() => handleLogin()}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
