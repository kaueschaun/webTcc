import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import "./styles.scss";

//import Header from '../../Header';
//import MaskedInput from 'react-text-mask';
import logo2 from "../../assets/logo2.png";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mask, setMask] = useState("");
  const history = useHistory();

  async function handleLogin() {
    const payload = {
      cpf,
      senha,
    };
    api
      .post("/colaboradores/login", payload)
      .then(({ data }) => {
        history.push("/cadastro");
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
      {/* 
        <ul class="header">
          <img alt="Logo Header" src={logoImg}></img>
        </ul> 
      */}
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
            <h1 id="h1Adm">do Administrador</h1>
          </div>

          <form id="form">
            <input
              value={cpf}
              id="cpf"
              placeholder="CPF"
              maxLength="11"
              onChange={(e) => setCpf(e.target.value)}
            />
            {/* <CpfCnpj
              id="cpf"
              maxLength="14"
              placeholder="CPF"
              value={cpf}
              onChange={(event, type) => {
                setCpf(event.target.value);
                setMask(type === "CPF");
              }}
            /> */}

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
