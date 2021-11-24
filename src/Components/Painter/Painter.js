import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
import Menu from "../Menu/Menu";
import Talks from "./Talks/Talks";
import Awards from "./Awards/Awards";
import Biography from "./Biography/Biography";
import Contact from "./Contact/Contact";
import { getResource } from "../../utils/requests";

const Painter = function Painter({ match }) {
  const dispatch = useDispatch();
  const { url } = match;

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
  }, [url, dispatch]);

  return (
    <div className="painter">
      <Grid container spacing={1}>
        <Grid item xs="auto" style={{ width: 180 }}>
          <Menu />
        </Grid>
        <Grid item xs>
          <div className="content-container">
            <Switch>
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
  );
};

export default Painter;
