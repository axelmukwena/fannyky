import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../Menu/menuSlice/updateMenu";
import Publications from "./Publications/Publications";
import Exhibitions from "./Exhibitions/Exhibitions";
import "./Painter.css";
import { updatePainter } from "./painterSlice/currentPainterSlice";
import { updateSiteName } from "../Menu/menuSlice/currentMenuSlice";
import Paintings from "./Paintings/Paintings";
import Talks from "./Talks/Talks";
import Awards from "./Awards/Awards";
import Biography from "./Biography/Biography";
import Contact from "./Contact/Contact";
import { getResource } from "../../utils/requests";
import MobileMenu from "../Menu/MobileMenu";
import DesktopMenu from "../Menu/DesktopMenu";

const Painter = function Painter({ match }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { url } = match;

  const [width, setWidth] = useState(null);

  function handleResize() {
    if (window.innerWidth > 900) {
      setWidth(window.innerWidth);
    } else {
      setWidth(null);
    }
  }

  useEffect(() => {
    function setPainter(painter) {
      if (painter) {
        const menu = parsePainterMenu(painter, url);
        updateMenuSlice(dispatch, menu);
        dispatch(updatePainter(painter));
        dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
      }
    }

    getResource(url, setPainter);

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [url, dispatch]);

  return (
    <>
      {!width ? <MobileMenu /> : null}

      <div className="painter">
        <Grid container spacing={1}>
          {width ? (
            <Grid item xs="auto" style={{ width: 180 }}>
              <DesktopMenu />
            </Grid>
          ) : null}
          <Grid item xs>
            <div className="content-container">
              <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route
                  path={`${url}/exhibitions`}
                  component={Exhibitions}
                  key="exhibitions"
                />
                <Route
                  path={`${url}/publications`}
                  component={Publications}
                  key="publications"
                />
                <Route path={`${url}/talks`} component={Talks} key="talks" />
                <Route path={`${url}/awards`} component={Awards} key="awards" />
                <Route
                  path={`${url}/biography`}
                  component={Biography}
                  key="biography"
                />
                <Route
                  path={`${url}/contact`}
                  component={Contact}
                  key="contact"
                />
                <Route path={url} component={Paintings} key="paintings" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Painter;
