import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./assets/logo.png";
import profileImg from "./assets/profile.png";

export default function Header() {
  return (
    <div class="containerHeader">
      <ul class="list">
        <img src={logoImg}></img>

        <li class="nav">
          <NavLink
            class="nav-link"
            activeClassName="active"
            exact
            to="/cadastro"
          >
            Cadastro
          </NavLink>
        </li>
        <li class="nav">
          <NavLink
            class="nav-link"
            activeClassName="active"
            exact
            to="/colaboradores"
          >
            Colaboradores
          </NavLink>
        </li>
        <li class="nav">
          <NavLink
            class="nav-link"
            activeClassName="active"
            exact
            to="/solicitacao"
          >
            Solcititações
          </NavLink>
        </li>
        <li class="nav">
          <NavLink class="nav-link" activeClassName="active" exact to="/conta">
            Conta
          </NavLink>
        </li>
        <li class="nav">
          <img src={profileImg}></img>
        </li>
      </ul>
    </div>
  );
}
