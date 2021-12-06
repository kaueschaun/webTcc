import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import {Nav, Navbar } from 'react-bootstrap';
import Logout from './../../assets/img/logout.png'
import "./header.scss";
const Header = () => {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  let canChange = false;

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/colaboradores">
        <img src={logoImg} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="list" id="responsive-navbar-nav">
        <Nav className="mr-auto ">
          <NavLink exact to="/cadastro">
            <Nav.Link href="/cadastro">Cadastro</Nav.Link>
          </NavLink>
          <NavLink   exact to="/colaboradores">
            <Nav.Link href="/colaboradores">Colaboradores</Nav.Link>
          </NavLink>
          <NavLink  to="/pontos">
            <Nav.Link href="/pontos">Pontos</Nav.Link>
          </NavLink>
          <NavLink  to="/solicitacoes">
            <Nav.Link href="/solicitacoes">Solicitações</Nav.Link>
          </NavLink>
        </Nav>
        <Nav>
          <Nav.Link>
          <button className="btn-logout" onClick={() => logout()}>
              Sair
              <img src={Logout} alt="Logout" />
           </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
