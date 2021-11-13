import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./Index";
import Show from "./Show";

const Paintings = function Paintings({ match }) {
  const { url } = match;
  return (
    <Switch>
      <Route
        path={`${url}/paintings/:paintingID`}
        component={Show}
        key="show"
      />
      <Route path={url} component={Index} key="index" />
    </Switch>
  );
};

export default Paintings;
