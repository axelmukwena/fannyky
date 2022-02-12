import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { useDispatch } from "react-redux";
import MobileMenu from "./Menu/MobileMenu";
import DesktopMenu from "./Menu/DesktopMenu";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../store/menuSlice/updateMenu";
import {
  updateActiveMenu,
  updateSiteName,
} from "../store/menuSlice/currentMenuSlice";
import authorizeUser from "../store/currentUser/authorize";
import { updatePainter } from "../store/painterSlice/currentPainterSlice";

const Layout = function Layout({ painter, children }) {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const setPainter = function parsePainter(painterData) {
    if (painterData && !painterData.record) {
      const menu = parsePainterMenu(painterData, `/${painterData.slug}`);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painterData));
      dispatch(updateSiteName([painterData.name, `/${painterData.slug}`]));
    } else {
      dispatch(updateActiveMenu(null));
    }
  };

  useEffect(() => {
    if (painter) {
      setPainter(painter);
    }
    authorizeUser(dispatch);
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [painter]);

  return (
    <>
      {width <= 900 ? <MobileMenu /> : null}

      <Grid
        className="painter"
        direction="row"
        justifyContent="start"
        alignItems="start"
        container
        spacing={0}
      >
        {width > 900 ? (
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
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
