import React, { useEffect, useState } from "react";
import "./App.css";
import "./toast.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import authorizeUser from "../currentUser/authorize";
import Painter from "../Components/Painter/Painter";
import Login from "../Components/Login/Login";
import { getResource } from "../utils/requests";
import Home from "../Components/Home/Home";
import FrontThree from "../Components/Home/FrontThree";
import Loading from "../Components/Loading/Loading";
import FrontTwo from "../Components/Home/FrontTwo";
import FrontOne from "../Components/Home/FrontOne";
import "bootstrap/dist/css/bootstrap.min.css";
import FrontFour from "../Components/Home/FrontFour";
import FrontFive from "../Components/Home/FrontFive";

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
