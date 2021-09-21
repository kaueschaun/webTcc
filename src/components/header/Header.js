import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import "./header.scss";
const Header = () => {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  let canChange = false;

  return (
    <div className="containerHeader">
      <div className={canChange ? "className-1" : "className-2"}></div>
      <div className="content">
        <a
          className="d-flex justify-content-space-between"
          href="/colaboradores"
        >
          <img className="logo" src={logoImg} alt="Logo" />
        </a>
      </div>
      <ul className="list">
        <li className="nav">
          <NavLink
            className="nav-link"
            // activeClassName="active"
            exact
            to="/cadastro"
          >
            Cadastro
          </NavLink>
        </li>
        <li className="nav">
          <NavLink
            className="nav-link"
            // activeclassName="active"
            exact
            to="/colaboradores"
          >
            Colaboradores
          </NavLink>
        </li>
        <li className="nav">
          <NavLink
            className="nav-link"
            // activeClassName="active"
            exact
            to="/pontos"
          >
            Pontos
          </NavLink>
        </li>
        <li className="nav">
          <NavLink
            className="nav-link"
            // activeclassName="active"
            exact
            to="/solicitacoes"
          >
            Solicitações
          </NavLink>
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
export default Header;
