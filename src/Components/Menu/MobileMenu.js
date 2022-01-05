import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Menu.css";
import SideMenu from "./MainMenu";

const MobileMenu = function MobileMenu() {
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

  const handleClick = () => {
    const items = document.getElementsByClassName("menu-item");
    for (let i = 0; i < items.length; i += 1) {
      items[i].className = "menu-item";
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="secondary"
          elevation={0}
          sx={{ margin: 0, position: "static", padding: "0" }}
        >
          <Toolbar className="toolbar">
            <div className="logo" style={{ flexGrow: 1, marginBottom: 0 }}>
              <Link to={logoUrl} onClick={handleClick} className="">
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
