import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Colaboradores from "./Pages/Colaboradores";
import LoginColaborador from "./Pages/LoginColaborador";
import Pontos from "./Pages/Pontos";
import Solicitacoes from "./Pages/Solicitacoes/solicitacoes";
import Conta from "./Pages/Conta";
import SolicitacoesColaborador from "./Pages/SolicitacoesColaborador";
import ColaboradorPontos from "./Pages/PontosColaborador/pontosColaborador";
import { adminIsAuthenticated } from "./authAdmin";
import { isAuthenticated } from "./auth";

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
        <PrivateRoute path="/pontos" component={Pontos} />
        <PrivateRoute path="/solicitacoes" component={Solicitacoes} />
        <PrivateRoute path="/conta" component={Conta} />
        <Route path="/login/colaborador" component={LoginColaborador} />
        <PrivateRouteColaborador
          path="/colaborador/solicitacoes"
          component={SolicitacoesColaborador}
        />
        <PrivateRouteColaborador
          path="/colaborador/pontos"
          component={ColaboradorPontos}
        />
      </Switch>
    </BrowserRouter>
  );
}
