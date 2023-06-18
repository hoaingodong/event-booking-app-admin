import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import ChangePassword from "../pages/ChangePassword";
import Events from "../pages/Events";

const Routes = () => {
  return (
    <Switch>
      <Route path="/settings " component={Users} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/users" component={Users} />
      <Route path="/events" component={Events} />
      <Route path="/change_password" component={ChangePassword} />
    </Switch>
  );
};

export default Routes;
