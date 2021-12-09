import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import authorizeUser from "../currentUser/authorize";
import Painter from "../Components/Painter/Painter";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import { getResource } from "../utils/requests";
// import Second from "../Components/Home/Second";

const App = function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Since the app is hosted on heroku on free servers,
  // this request's main purpose is to wake the app up
  // eslint-disable-next-line no-unused-vars
  function wakeUpApp(data) {
    if (!data) {
      getResource("/", wakeUpApp);
      window.location.reload();
    }
  }

  useEffect(() => {
    getResource("/", wakeUpApp);
    authorizeUser(dispatch);
  }, [dispatch]);

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/:painterID" component={Painter} key="painter" />
    </Switch>
  );
};
export default App;
