import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import logoutUser from "../../currentUser/logout";
import "./Menu.css";

const MainMenu = function MainMenu({ handleClose }) {
  const currentMenu = useSelector((state) => state.currentMenu.menu);

  const currentYear = new Date().getFullYear();

  const handleClick = (e) => {
    const items = document.getElementsByClassName("menu-item");
    for (let i = 0; i < items.length; i += 1) {
      items[i].className = "menu-item";
    }
    const parent = e.target.parentElement.parentElement;
    parent.className = "menu-item active";

    handleClose();
  };

  if (currentMenu) {
    return (
      <>
        <div className="menu-item">
          <Link to="/">
            <Typography>Home</Typography>
          </Link>
        </div>
        {currentMenu.map((item) => (
          <div
            key={item.id}
            className="menu-item"
            role="button"
            onClick={handleClick}
            onKeyPress={handleClick}
            tabIndex={0}
          >
            <Link to={item.slug}>
              <Typography>{item.name}</Typography>
            </Link>
          </div>
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
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    const success = logoutUser(dispatch);
    // https://reactrouter.com/web/api/Hooks/usehistory
    if (success) {
      history.replace(history.location.pathname);
    }
  };

  if (currentUser) {
    return (
      <div className="menu-item">
        <Link to="/logout" onClick={handleLogout} style={{ borderRadius: 5 }}>
          <Typography
            style={{
              fontWeight: 400,
            }}
          >
            Logout
          </Typography>
        </Link>
      </div>
    );
  }
  return "";
};

export default MainMenu;