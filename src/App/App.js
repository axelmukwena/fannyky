import React, { useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import Landing from "../Components/Landing/Landing";
import authorizeUser from "../currentUser/authorize";
import Painter from "../Components/Painter/Painter";
import Menu from "../Components/Menu/Menu";
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
          <Landing />
        </Route>
        <div className="app-container">
          <Grid container spacing={1}>
            <Grid item xs={1} style={{ marginRight: 70 }}>
              <Menu />
            </Grid>
            <Grid item xs>
              <div className="content-container">
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route path="/:painterID" component={Painter} key="painter" />
              </div>
            </Grid>
          </Grid>
        </div>
      </Switch>
    </Router>
  );
};
export default App;
