import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Index from "./Index";
import Show from "./Show";

const Publications = function Publications({ match }) {
  const { pathname } = useLocation();
  const { url } = match;
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route path={`${url}/:publicationID`} component={Show} key="show" />
      <Route path={url} component={Index} key="index" />
    </Switch>
  );
};

export default Publications;
