/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link as MuiLink, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logoutUser from "../../store/currentUser/logout";
import useUser from "../../api/useUser";
import { parsePainterMenu } from "../../utilities/helpers";

const MainMenu = function MainMenu({ painter, handleClose }) {
  const menuItems = parsePainterMenu(painter);
  const activeMenu = useSelector((state) => state.currentMenu.activeMenu);

  const currentYear = new Date().getFullYear();

  const handleClick = (url) => {
    // e.preventDefault();
    const items = document.getElementsByClassName("menu-item");
    for (let i = 0; i < items.length; i += 1) {
      items[i].className = "menu-item";
    }

    const current = document.getElementById(url);
    current.className = "menu-item active";

    handleClose();
    // router.replace(url);
  };

  if (menuItems) {
    return (
      <>
        <Link href="/" as="/">
          <a style={{ textDecoration: "none" }}>
            <Typography sx={{ padding: "5px 0" }}>
              <span className="menu-item">Home</span>
            </Typography>
          </a>
        </Link>
        {menuItems.map((menu) => (
          <Link
            key={menu.id}
            onClick={(event) => handleClick(event, menu.id)}
            href={`/[painterSlug]${menu.extension}`}
            as={`${menu.painterSlug}${menu.extension}`}
            style={{ textDecoration: "none" }}
          >
            <a style={{ textDecoration: "none" }}>
              <Typography sx={{ padding: "5px 0" }}>
                <span
                  id={menu.id}
                  className={
                    activeMenu === menu.name ? "menu-item-active" : "menu-item"
                  }
                >
                  {menu.name}
                </span>
              </Typography>
            </a>
          </Link>
        ))}
        <IsLoggedIn />
        <div className="copyright">
          <div>All rights reserved.</div>
          <div>© {currentYear}</div>
        </div>
      </>
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn() {
  const { user } = useUser();

  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    router.replace(router.pathname);
  };

  if (user) {
    return (
      <div className="menu-item">
        <MuiLink
          href="/logout"
          onClick={handleLogout}
          style={{ textDecoration: "none" }}
        >
          <Typography sx={{ padding: "5px 0" }}>
            <span id="logout" className="menu-item">
              Logout
            </span>
          </Typography>
        </MuiLink>
      </div>
    );
  }
  return null;
};

export default MainMenu;
