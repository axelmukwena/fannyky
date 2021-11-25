import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import authorizeUser from "../currentUser/authorize";
import Painter from "../Components/Painter/Painter";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";

const App = function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
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
