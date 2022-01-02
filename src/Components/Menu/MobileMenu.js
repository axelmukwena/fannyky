import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Menu.css";
import SideMenu from "./MainMenu";

const useStyles = makeStyles(() => ({
  appBar: {
    margin: 0,
    position: "static",
  },
  typography: {
    fontWeight: 500,
    fontSize: "1.2rem",
    color: "#444",
    textDecoration: "none",
    marginLeft: 5,
    marginRight: 5,
  },
}));

const MobileMenu = function MobileMenu() {
  const classes = useStyles();
  const [logoName, logoUrl] = useSelector(
    (state) => state.currentMenu.siteName
  );

  const handleOpen = () => {
    document.getElementById("popup-nav").style.display = "block";
    document.getElementById("popup-nav").style.minWidth = "200px";
    document.getElementById("back-layer").style.display = "block";
    document.getElementById("popup-nav").style.padding = "1.5em";
  };

  const handleClose = () => {
    document.getElementById("popup-nav").style.minWidth = "0";
    document.getElementById("back-layer").style.display = "none";
    document.getElementById("popup-nav").style.padding = "0";
    document.getElementById("popup-nav").style.display = "none";
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="secondary"
          elevation={0}
          className={clsx(classes.appBar)}
        >
          <Toolbar className="toolbar">
            <div className="logo" style={{ flexGrow: 1, marginBottom: 0 }}>
              <Link to={logoUrl} className="">
                <Typography
                  style={{
                    fontWeight: 900,
                    fontSize: "1.4rem",
                    fontFamily: "Roboto",
                  }}
                >
                  {logoName.toLowerCase()}
                </Typography>
              </Link>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              style={{ color: "#787878" }}
              onClick={handleOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        id="back-layer"
        className="back-layer"
        onClick={handleClose}
        onKeyDown={handleClose}
        role="button"
        tabIndex={0}
        aria-label="Mobile Menu"
      />
      <Paper id="popup-nav" elevation={0} className="popup-nav">
        <SideMenu handleClose={handleClose} />
      </Paper>
    </>
  );
};

export default MobileMenu;
