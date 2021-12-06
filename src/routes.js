import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Colaboradores from "./pages/Colaboradores";
import Colaborador from "./pages/Colaborador";
import LoginColaborador from "./pages/LoginColaborador";
import Pontos from "./pages/Pontos";
import Solicitacoes from "./pages/Solicitacoes";
import Conta from "./pages/Conta";
import SolicitacoesColaborador from "./pages/SolicitacoesColaborador";
import ColaboradorPontos from "./pages/PontosColaborador";
import { adminIsAuthenticated } from "./authAdmin";
import { isAuthenticated } from "./auth";
import PontoColaborador from "./pages/PontoColaborador";
import PontoDoColaborador from "./pages/PontoDoColaborador";
import SolicitacaoColaborador from "./pages/SolicitacaoColaborador";
import Tarefas from "./pages/Tarefas";
import Perfil from "./pages/Perfil";
import Relatorio from "./pages/Relatorio";

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
