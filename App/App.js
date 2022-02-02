import React, { useEffect, useState } from "react";
import "./App.css";
import "./toast.css";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import authorizeUser from "../src/currentUser/authorize";
import Painter from "../src/Components/Painter/Painter";
import Login from "../src/Components/Login/Login";
import { getResource } from "../src/utils/requests";
import Home from "../src/Components/Home/Home";
import FrontThree from "../src/Components/Home/FrontThree";
import Loading from "../src/Components/Loading/Loading";
import FrontTwo from "../src/Components/Home/FrontTwo";
import FrontOne from "../src/Components/Home/FrontOne";
import "bootstrap/dist/css/bootstrap.min.css";
import FrontFour from "../src/Components/Home/FrontFour";
import FrontFive from "../src/Components/Home/FrontFive";

const App = function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(null);

  // Since the app is hosted on heroku on free servers,
  // this request's main purpose is to wake the app up
  // eslint-disable-next-line no-unused-vars
  function wakeUpApp(data) {
    setLoaded(data);
  }

  useEffect(() => {
    getResource("/", wakeUpApp);
    authorizeUser(dispatch);
  }, [dispatch]);

  // Loader
  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/front-one">
          <FrontOne />
        </Route>
        <Route exact path="/front-two">
          <FrontTwo />
        </Route>
        <Route exact path="/front-three">
          <FrontThree />
        </Route>
        <Route exact path="/front-four">
          <FrontFour />
        </Route>
        <Route exact path="/front-five">
          <FrontFive />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/:painterID" component={Painter} key="painter" />
      </Switch>
      <div id="toasts-root" />
    </>
  );
};
export default App;
