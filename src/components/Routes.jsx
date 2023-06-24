import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import ChangePassword from "../pages/ChangePassword";
import Events from "../pages/Events";
import loggedIn from "../auth/loggedIn";
import Login from "../pages/authentication/Login";

const Routes = () => {
  const checkedLogin = loggedIn()
  return (
    <Switch>
      {/* <Route path="/" component={checkedLogin?Dashboard:Login} /> */}
      <Route path="/settings " exact component={Users} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/users" exact component={Users} />
      <Route path="/events" exact component={Events} />
      <Route path="/change_password" exact component={ChangePassword} />
    </Switch>
  );
};

export default Routes;
