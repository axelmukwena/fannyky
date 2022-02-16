/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link as MuiLink, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logoutUser from "../../store/currentUser/logout";

const MainMenu = function MainMenu({ handleClose }) {
  const currentMenu = useSelector((state) => state.currentMenu.menu);
  const activeMenu = useSelector((state) => state.currentMenu.activeMenu);
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const handleClick = (e, url) => {
    e.preventDefault();
    const items = document.getElementsByClassName("menu-item");
    for (let i = 0; i < items.length; i += 1) {
      items[i].className = "menu-item";
    }
    const current = document.getElementById(url);
    current.className = "menu-item active";

    handleClose();
    router.replace(url);
  };

  if (currentMenu) {
    return (
      <>
        <Link href="/">
          <a style={{ textDecoration: "none" }}>
            <Typography sx={{ padding: "5px 0" }}>
              <span className="menu-item">Home</span>
            </Typography>
          </a>
        </Link>
        {currentMenu.map((item) => (
          <Link
            key={item.id}
            onClick={(event) => handleClick(event, item.slug)}
            href={item.slug}
            style={{ textDecoration: "none" }}
          >
            <a style={{ textDecoration: "none" }}>
              <Typography sx={{ padding: "5px 0" }}>
                <span
                  id={item.slug}
                  className={
                    activeMenu === item.name ? "menu-item-active" : "menu-item"
                  }
                >
                  {item.name}
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
  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    const success = logoutUser(dispatch);
    if (success) {
      router.replace(router.pathname);
    }
  };

  if (currentUser) {
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
  return "";
};

export default MainMenu;
