import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Colaboradores from "./Pages/colaboradores";
import LoginColaborador from "./Pages/LoginColaborador";
import SolicitacoesColaborador from "./Pages/SolicitacoesColaborador";
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
        <Route path="/login/colaborador" component={LoginColaborador} />
        <PrivateRouteColaborador
          path="/solicitacoes/colaborador"
          component={SolicitacoesColaborador}
        />
      </Switch>
    </BrowserRouter>
  );
}
