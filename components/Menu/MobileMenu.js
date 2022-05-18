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
import MainMenu from "./MainMenu";
import NextLink from "../NextLink";

const MobileMenu = function MobileMenu({ painter }) {
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

  if (!painter) return null;

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
              <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
                <NextLink
                  href={`/${painter.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    style={{
                      fontWeight: 900,
                      fontSize: "1.4rem",
                      fontFamily: "Roboto",
                    }}
                  >
                    {painter.name}
                  </Typography>
                </NextLink>
              </Box>
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
        <MainMenu painter={painter} handleClose={handleClose} />
      </Paper>
    </>
  );
};

export default MobileMenu;
