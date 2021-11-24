import React, { useEffect } from "react";
import "./App.css";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import authorizeUser from "../currentUser/authorize";
import Painter from "../Components/Painter/Painter";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";

const useStyles = makeStyles(() => ({
  container: {},
}));

const App = function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    authorizeUser(dispatch);
  }, [dispatch]);

  return (
    <Router className={clsx(classes.container)}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/:painterID" component={Painter} key="painter" />
      </Switch>
    </Router>
  );
};
export default App;
