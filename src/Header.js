import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./assets/logo.png";

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }
  handleClick() {
    alert("clique aqui");
  }

  render() {
    let canChange = false;

    return (
      <div class="containerHeader">
        <div className={canChange ? "class-1" : "class-2"}></div>

        <ul class="list">
          <img src={logoImg} alt="Logo" />

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
export default Header;
