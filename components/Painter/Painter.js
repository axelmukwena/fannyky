import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../../store/menuSlice/updateMenu";
import Publications from "./Publications/Publications";
import Exhibitions from "./Exhibitions/Exhibitions";
import { updatePainter } from "../../store/painterSlice/currentPainterSlice";
import { updateSiteName } from "../../store/menuSlice/currentMenuSlice";
import Talks from "./Talks/Talks";
import Awards from "./Awards/Awards";
import Contact from "./Contact/Contact";
import Biography from "./Biography/Biography";
import { getResource } from "../../utilities/requests";
import MobileMenu from "../Menu/MobileMenu";
import DesktopMenu from "../Menu/DesktopMenu";

const Painter = function Painter() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [width, setWidth] = useState(null);

  function handleResize() {
    if (window.innerWidth > 900) {
      setWidth(window.innerWidth);
    } else {
      setWidth(null);
    }
  }

  function setPainter(painter) {
    if (painter) {
      const menu = parsePainterMenu(painter, pathname);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painter));
      dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
    }
  }

  useEffect(() => {
    getResource(pathname, setPainter);

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname, dispatch]);

  return (
    <>
      {!width ? <MobileMenu /> : null}

      <Grid
        className="painter"
        direction="row"
        justifyContent="start"
        alignItems="start"
        container
        spacing={0}
      >
        {width ? (
          <Grid item xs={2.5}>
            <DesktopMenu />
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          md={9.5}
          sx={{ paddingLeft: "0 !important", paddingTop: "0 !important" }}
        >
          <div className="content-container">
            <Switch>
              <Redirect from="/:pathname*(/+)" to={pathname.slice(0, -1)} />
              <Route
                path={`${pathname}/exhibitions`}
                component={Exhibitions}
                key="exhibitions"
              />
              <Route
                path={`${pathname}/publications`}
                component={Publications}
                key="publications"
              />
              <Route path={`${pathname}/talks`} component={Talks} key="talks" />
              <Route
                path={`${pathname}/awards`}
                component={Awards}
                key="awards"
              />
              <Route
                path={`${pathname}/biography`}
                component={Biography}
                key="biography"
              />
              <Route
                path={`${pathname}/contact`}
                component={Contact}
                key="contact"
              />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Painter;
