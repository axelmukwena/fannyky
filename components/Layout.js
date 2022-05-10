import React from "react";
import { Grid, Box } from "@mui/material";
import MobileMenu from "./Menu/MobileMenu";
import DesktopMenu from "./Menu/DesktopMenu";
import Loading from "./Loading/Loading";

const Layout = function Layout({ painter, children }) {
  if (!painter) return <Loading />;

  return (
    <>
      <Box className="mobile">
        <MobileMenu painter={painter} />
      </Box>

      <Grid
        className="painter"
        direction="row"
        justifyContent="start"
        alignItems="start"
        container
        spacing={0}
      >
        <Box className="desktop">
          <Grid item xs={2.5}>
            <DesktopMenu painter={painter} />
          </Grid>
        </Box>

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
