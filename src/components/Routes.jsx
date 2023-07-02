import React from "react";

import { Route, Switch } from "react-router-dom";

import Users from "../pages/Users";
import Events from "../pages/Events";
import Reviews from "../pages/Reviews";

const Routes = () => {
  return (
    <Switch>
      <Route path="/users" exact component={Users} />
      <Route path="/events" exact component={Events} />
      <Route path="/reviews" exact component={Reviews} />
    </Switch>
  );
};

export default Routes;
