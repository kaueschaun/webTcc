import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./assets/logo.png";

class HeaderColab extends Component {
  handleClick() {
    alert("clique aqui");
  }

  render() {
    let canChange = false;

    return (
      <div class="containerHeader">
        <div class="content">
          <div className={canChange ? "class-1" : "class-2"}></div>

          <a
            class="d-flex justify-content-space-between"
            href="/colaborador/pontos"
          >
            <img src={logoImg} alt="Logo" />
          </a>
        </div>
        <ul class="list">
          <li class="nav">
            <NavLink
              class="nav-link"
              activeClassName="active"
              exact
              to="/colaborador/pontos"
            >
              Pontos
            </NavLink>
          </li>
          <li class="nav">
            <NavLink
              class="nav-link"
              activeClassName="active"
              exact
              to="/colaborador/solicitacoes"
            >
              Solicitações
            </NavLink>
          </li>

          <li class="nav">
            <NavLink
              class="nav-link"
              activeClassName="active"
              exact
              to="/conta"
            >
              Perfil
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default HeaderColab;
