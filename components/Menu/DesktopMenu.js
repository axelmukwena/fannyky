import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "../NextLink";
import MainMenu from "./MainMenu";

const DesktopMenu = function DesktopMenu({ painter }) {
  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  // Dummy. See MobileMenu and MainMenu for usecase
  const handleClose = () => {};

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    const items = document.getElementsByClassName("menu-item");
    for (let i = 0; i < items.length; i += 1) {
      items[i].className = "menu-item";
    }
  };

  if (!painter) return null;

  if (width > 900) {
    return (
      <Paper id="sidemenu" elevation={0} className="sidemenu">
        <div className="logo">
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
                  flex: 1,
                }}
              >
                {painter.name}
              </Typography>
            </NextLink>
          </Box>
        </div>
        <MainMenu painter={painter} handleClose={handleClose} />
      </Paper>
    );
  }
  return null;
};

export default DesktopMenu;
