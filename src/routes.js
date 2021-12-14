import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cadastro from "../src/Pages/Cadastro/index";
import Colaboradores from "./Pages/colaboradores/index";
import Colaborador from "../src/Pages/Colaborador/index";
import LoginColaborador from "../src/Pages/LoginColaborador/index";
import Pontos from "../src/Pages/Pontos/index";
import Solicitacoes from "../src/Pages/Solicitacoes/index";
import SolicitacoesColaborador from "../src/Pages/SolicitacoesColaborador/index";
import ColaboradorPontos from "../src/Pages/PontosColaborador/index";
import { adminIsAuthenticated } from "./authAdmin";
import { isAuthenticated } from "./auth";
import PontoColaborador from "../src/Pages/PontoColaborador/index";
import PontoDoColaborador from "../src/Pages/PontoDoColaborador/index";
import SolicitacaoColaborador from "../src/Pages/SolicitacaoColaborador/index";
import Tarefas from "../src/Pages/Tarefas/index";
import Perfil from "../src/Pages/Perfil/index";
import Relatorio from "../src/Pages/Relatorio/index";
import Login from "../src/Pages/Login/index";

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
