import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@mui/material";
import { getPublicData } from "../../utils/Helpers";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../Menu/menuSlice/updateMenu";
import Books from "./Books";
import Exhibitions from "./Exhibitions";
import "./Painter.css";
import { updatePainter } from "./painterSlice/currentPainterSlice";
import { updateSiteName } from "../Menu/menuSlice/currentMenuSlice";
import Paintings from "./Paintings/Paintings";
import Menu from "../Menu/Menu";

const Painter = function Painter({ match }) {
  const dispatch = useDispatch();
  const { url } = match;

  // paths
  // paintings => /painter
  // exhibitions => /painter/exhibitions
  // books => /painter/books
  // about => /painter/about

  // If painter updated, set painter menu
  // parsePainterMenu(painterName, aboutSlug, paintingsSlug, exhibSlug, booksSlug)

  useEffect(() => {
    function setPainter(painter) {
      if (painter) {
        const menu = parsePainterMenu(
          `${url}`,
          `${url}/exhibitions`,
          `${url}/books`,
          `${url}/about`
        );
        updateMenuSlice(dispatch, menu);
        dispatch(updatePainter(painter));
        dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
      }
    }

    getPublicData(setPainter, url);
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
              <Route path={`${url}/books`} component={Books} key="books" />
              <Route path={url} component={Paintings} key="paintings" />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Painter;
