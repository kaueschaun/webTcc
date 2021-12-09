import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/pages/Login";
import Cadastro from "../src/pages/Cadastro";
import Colaboradores from "../src/pages/Colaboradores";
import Colaborador from "../src/pages/Colaborador";
import LoginColaborador from "../src/pages/LoginColaborador";
import Pontos from "../src/pages/Pontos";
import Solicitacoes from "./src/pages/Solicitacoes";
import Conta from "../src/pages/Conta";
import SolicitacoesColaborador from "../src/pages/SolicitacoesColaborador";
import ColaboradorPontos from "../src/pages/PontosColaborador";
import { adminIsAuthenticated } from "../src/authAdmin";
import { isAuthenticated } from "../src/auth";
import PontoColaborador from "../src/pages/PontoColaborador";
import PontoDoColaborador from "../src/pages/PontoDoColaborador";
import SolicitacaoColaborador from "../src/pages/SolicitacaoColaborador";
import Tarefas from "../src/pages/Tarefas";
import Perfil from "../src/pages/Perfil";
import Relatorio from "../src/pages/Relatorio";

const PrivateRouteColaborador = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login/colaborador",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      adminIsAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/cadastro" component={Cadastro} />
        <PrivateRoute path="/colaboradores" component={Colaboradores} />
        <PrivateRoute path="/colaborador" component={Colaborador} />
        <PrivateRoute path="/pontos" component={Pontos} />
        <PrivateRoute path="/ponto-do-colaborador" component={PontoDoColaborador} />
        <PrivateRoute path="/solicitacoes" component={Solicitacoes} />
        <PrivateRoute path="/conta" component={Conta} />
        <PrivateRoute path="/relatorio" component={Relatorio} />
        <Route path="/login/colaborador" component={LoginColaborador} />
        
        <PrivateRouteColaborador
          path="/solicitacoes-colaborador"
          component={SolicitacoesColaborador}
        />
        <PrivateRouteColaborador
          path="/solicitacao-colaborador"
          component={SolicitacaoColaborador}
        />
        <PrivateRouteColaborador
          path="/pontos-colaborador"
          component={ColaboradorPontos}
        />
        <PrivateRouteColaborador
          path="/ponto-colaborador"
          component={PontoColaborador}
        />
        <PrivateRouteColaborador
          path="/tarefas-colaborador"
          component={Tarefas}
        />
        <PrivateRouteColaborador
          path="/perfil-colaborador"
          component={Perfil}
        />
      </Switch>
    </BrowserRouter>
  );
}
