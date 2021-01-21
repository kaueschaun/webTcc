import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Colaboradores from "./Pages/colaboradores";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/colaboradores" component={Colaboradores} />
      </Switch>
    </BrowserRouter>
  );
}
