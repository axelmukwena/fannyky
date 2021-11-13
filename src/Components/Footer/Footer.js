import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import { Typography, Toolbar, AppBar } from "@mui/material";

const useStyless = makeStyles(() => ({
  appBar: {
    bottom: 0,
    top: "auto",
    position: "static",
    zIndex: -2,
    padding: "35px 0 10px 0",
  },
  typography: {
    fontSize: "0.8rem",
    color: "#444",
    flexGrow: 1,
    textAlign: "center",
  },
  toolBar: {
    minHeight: 50,
  },
  button: {
    textTransform: "none",
    padding: 0,
    marginBottom: 4,
    minWidth: 50,
  },
}));

const Footer = function Footer() {
  const classes = useStyless();
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <AppBar color="secondary" elevation={0} className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.typography}>
            ©{currentYear}. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
