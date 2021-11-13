import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
  );
};

export default Painter;
