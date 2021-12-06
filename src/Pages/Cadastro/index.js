import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./styles.scss";
import "../../components/header/Header.js";
import MaskedInput from "react-text-mask";
import MaskedCpfInput from "../../components/masked/MaskedInput";
import api from "../../services/api";
import Header from "../../components/header/Header";
import MaskedPhone from "../../components/masked/MaskedPhone";

const Cadastro = () => {
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

  function validarCpf(cpf) {
    var soma;
    var resto;
    soma = 0;
    if(cpf === "00000000000") {
      return false;
    }
    
    for (let i = 1; i < 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false
    }
    soma = 0;
    for  (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
  }
  

  async function handleRegister(e) {

    
    const isvalid = validarCpf(cpf)
    
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

    if(nome_completo, cpf, data_nasc, data_admissao, horas_mensais, senha, email, endereco, telefone_celular, setor === "" ) {
      alert("Preencha todos os campos!")
      return
    }
    if (nome_completo.indexOf(" ") === -1) {
      alert("Insira o nome completo");
      setNome("");
      return;
    }
    if (cpf === "" || !isvalid) {
      alert("Insira um CPF válido!");
      setCpf("");
      return;
    }
    if (data_nasc.substr(9, 1) === "_") {
      alert("Insira a data de nascimento corretamente");
      setData_nasc("");
      return;
    }
    if (email.indexOf("@") === -1) {
      alert("Insira um email válido");
      setEmail("");
      return;
    }
    if (telefone_celular.length < 11) {
      alert("Insira o Telefone corretamente");
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
        history.push("/colaboradores");
      } catch (err) {
        alert("Por favor, tente novamente.");
      }
    } else {
      alert("Por favor preencher os campos corretamente.");
    }
  }

  return (
    <div>
      <Header />
      <form className="containerAll" onSubmit={handleRegister}>
        <section className="container">
          <h1 className="title">Cadastro</h1>

          <div className="content-one">
            <div className="content-input">
              <div className="content-fields">
                <p className="title-input">Nome Completo:</p>

                <input
                  className="field-input"
                  placeholder="Digite o nome completo"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="content-fields">
                <p className="title-input">CPF:</p>
                <MaskedCpfInput
                  className="field-input"
                  isLogin = {false}
                  value={cpf}
                  regex
                  onChange={(event) => {
                    setCpf(event.target.value);
                  }}
                />
              </div>
              <div className="content-fields">
                <p className="title-input">Data de Nascimento:</p>

                <MaskedInput
                  className="field-input"
                  placeholder="00/00/0000"
                  onChange={(e) => setData_nasc(e.target.value)}
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
              <div className="content-fields">
                <p className="title-input">E-mail:</p>
                <input
                  className="field-input"
                  placeholder="fulano@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="content-two">
            <div className="content-fields">
              <p className="title-input">Endereço:</p>
              <input
                className="field-input"
                placeholder="Digite o endereço"
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="content-fields-inputs">
              <div className="content-num content-fields">
                <p className="title-input">Número:</p>

                <input
                  className="field-input"
                  placeholder="Digite o número do endereço"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="content-admissao content-fields">
                <p className="title-input">Data de Admissão:</p>
                <MaskedInput
                  className="field-input"
                  onChange={(e) => setAdmissao(e.target.value)}
                  placeholder="00/00/0000"
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

            <div className="content-fields-inputs">
              <div className="content-fields">
                <p className="title-input">Setor:</p>
                <input
                  className="field-input"
                  placeholder="Digite o setor"
                  onChange={(e) => setSetor(e.target.value)}
                />
              </div>

              <div className="content-fields">
                <p className="title-input">Horas Mensais:</p>
                <input
                  className="field-input"
                  placeholder="Digite as horas mensais"
                  onChange={(e) => setHoras_mensais(e.target.value)}
                />
              </div>
            </div>

            <div className="content-fields">
              <p className="title-input">Telefone Celular:</p>
              
              <MaskedPhone  onChange={(e) => setTelefone(e.target.value)} />
            </div>
            <div className="content-fields">
              <p className="title-input">Senha:</p>
              <input
                className="field-input"
                type="password"
                placeholder="Digite a senha"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>
          <div className="contentButton">
            <button className="btn">Cadastrar</button>
          </div>
        </section>
      </form>
    </div>
  );
};
export default Cadastro;
