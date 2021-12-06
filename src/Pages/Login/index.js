import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

import MaskedCpfInput from "../../components/masked/MaskedInput";
import logo2 from "../../assets/img/logo2.png";
import logoImg from "../../assets/img/logo.png";
import api from "../../services/api";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  async function handleLogin() {
    const payload = {
      cpf,
      senha,
    };
    api
      .post("/colaboradores/login", payload)
      .then(({ data }) => {
        localStorage.setItem("admin_token", data.token);
        history.push("/colaboradores");
      })
      .catch((err) => alert("Senha ou CPF Incorreto"));
  }

  return (
    <div className="container-all">
      <div className="header">
        {" "}
        <ul>
          <img alt="Logo Header" className="logo" src={logoImg}></img>
        </ul>
      </div>

      <div className="container-titles">
        <div className="content-txt-title">
          <h1 className="txt-welcome">Bem-vindo</h1>
          <h1 className="txt-hora-certa"> ao Hora Certa</h1>
        </div>
      </div>
      <div className="container-form">
        <div className="content-input">
          <div className="content-logo">
            <img className="image" alt="Logo Adm" src={logo2}></img>
            <h1 className="title-logo">Login</h1>
            <h1 className="title-logo-two">do Administrador</h1>
          </div>

          <form className="form">
            <MaskedCpfInput
              value={cpf}
              type="number"
              isLogin = {true}
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              className="senha"
              type="password"
              placeholder="SENHA"
              value={senha}
              maxLength="8"
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              className="btn-login"
              type="button"
              onClick={() => handleLogin()}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
