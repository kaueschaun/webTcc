import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import "./headerColab.scss";
const HeaderColab = () => {
  function logout() {
    localStorage.clear();
    window.location.href = "/login/colaborador";
  }
  let canChange = false;

  return (
    <div className="containerHeader">
      <div className="content">
        <div className={canChange ? "className-1" : "className-2"}></div>

        <a
          className="d-flex justify-content-space-between"
          href="/pontosColaborador"
        >
          <img src={logoImg} alt="Logo" />
        </a>
      </div>
      <ul className="list">
        <li className="nav">
          <NavLink
            className="nav-link"
            activeclassName="active"
            exact
            to="/pontosColaborador"
          >
            Pontos
          </NavLink>
        </li>
        <li className="nav">
          <NavLink
            className="nav-link"
            activeclassName="active"
            exact
            to="/colaborador/solicitacoes"
          >
            Solicitações
          </NavLink>
        </li>
        <li className="nav">
          <button href="/pontosColaborador" className="btn-register">
            Registre
          </button>
        </li>
        <li className="nav">
          <button className="btn-logout" onClick={() => logout()}>
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
};
export default HeaderColab;
