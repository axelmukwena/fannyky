import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Index from "./Index";
import Show from "./Show";

const Awards = function Awards({ match }) {
  const { pathname } = useLocation();
  const { url } = match;
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route path={`${url}/:awardID`} component={Show} key="show" />
      <Route path={url} component={Index} key="index" />
    </Switch>
  );
};

export default Awards;
