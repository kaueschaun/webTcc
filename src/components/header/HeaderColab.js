import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import "./headerColab.scss";
import {Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Logout from "../../assets/img/logout.png";

const HeaderColab = () => {
  
  const id = localStorage.getItem('id')

  function pushRegistre() {
    window.location.href= `/pontos-colaborador?id=${id}`
  }
  
  function logout() {
    localStorage.clear();
    window.location.href = "/login/colaborador";
  }

  let canChange = false;

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/ponto-colaborador">
        <img src={logoImg} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="list" id="responsive-navbar-nav">
        <Nav className="mr-auto ">
          <NavLink to="/ponto-colaborador">
            <Nav.Link href="/ponto-colaborador">Meus Pontos</Nav.Link>
          </NavLink>
          <NavLink  to="/solicitacoes-colaborador">
            <Nav.Link href="/solicitacoes-colaborador">Minhas Solicitações</Nav.Link>
          </NavLink>
          <NavLink  to="/tarefas-colaborador">
            <Nav.Link href="/tarefas-colaborador">Tarefas</Nav.Link>
          </NavLink>

          <NavDropdown title="Perfil" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/perfil-colaborador">
              Editar
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>
            <button onClick={() => pushRegistre()} className="btn-register">
              Registre
            </button>
          </Nav.Link>
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
export default HeaderColab;
