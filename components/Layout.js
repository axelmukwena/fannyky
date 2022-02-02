import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import MobileMenu from "./Menu/MobileMenu";
import DesktopMenu from "./Menu/DesktopMenu";

const Layout = function Layout({ children }) {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

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
