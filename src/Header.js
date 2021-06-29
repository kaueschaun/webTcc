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
        <div class="content">
          <a class="d-flex justify-content-space-between" href="/colaboradores">
            <img class="logo" src={logoImg} alt="Logo" />
          </a>
        </div>
        <ul class="list">
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
              to="/pontos"
            >
              Pontos
            </NavLink>
          </li>
          <li class="nav">
            <NavLink
              class="nav-link"
              activeClassName="active"
              exact
              to="/solicitacoes"
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
