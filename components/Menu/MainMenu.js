import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import logoutUser from "../../store/currentUser/logout";

const MainMenu = function MainMenu({ handleClose }) {
  const currentMenu = useSelector((state) => state.currentMenu.menu);
  const navigate = useNavigate();

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
    navigate(url);
  };

  if (currentMenu) {
    return (
      <>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={{ padding: "5px 0" }}>
              <span className="menu-item">Home</span>
            </Typography>
          </Link>
        </div>
        {currentMenu.map((item) => (
          <Link
            key={item.id}
            onClick={(event) => handleClick(event, item.slug)}
            to={item.slug}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ padding: "5px 0" }}>
              <span id={item.slug} className="menu-item">
                {item.name}
              </span>
            </Typography>
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = (event) => {
    event.preventDefault();
    const success = logoutUser(dispatch);
    if (success) {
      navigate(location.pathname, { replace: true });
    }
  };

  if (currentUser) {
    return (
      <div className="menu-item">
        <Link
          to="/logout"
          onClick={handleLogout}
          style={{ textDecoration: "none" }}
        >
          <Typography sx={{ padding: "5px 0" }}>
            <span id="logout" className="menu-item">
              Logout
            </span>
          </Typography>
        </Link>
      </div>
    );
  }
  return "";
};

export default MainMenu;
