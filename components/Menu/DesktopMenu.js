import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MainMenu from "./MainMenu";

const DesktopMenu = function DesktopMenu() {
  const [width, setWidth] = useState(0);
  const [logoName, logoUrl] = useSelector(
    (state) => state.currentMenu.siteName
  );

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

  if (width > 900) {
    return (
      <Paper id="sidemenu" elevation={0} className="sidemenu">
        <div className="logo">
          <Link to={logoUrl} onClick={handleClick} className="">
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {logoName}
            </Typography>
          </Link>
        </div>
        <MainMenu handleClose={handleClose} />
      </Paper>
    );
  }
  return null;
};

export default DesktopMenu;
