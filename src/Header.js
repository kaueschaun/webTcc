import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "./assets/logo.png";
import profileImg from "./assets/profile.png";

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
          <img src={logoImg}></img>
          <button
            id="hamburgue"
            type="button"
            // onClick={() => handleClick()}
          ></button>
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
              Solcitações
            </NavLink>
          </li>

          <li class="nav">
            <NavLink
              class="nav-link"
              activeClassName="active"
              exact
              to="/conta"
            >
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
}
export default Header;
