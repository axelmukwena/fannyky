import { Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import logoutUser from "../../currentUser/logout";

const SideMenu = function SideMenu() {
  const currentMenu = useSelector((state) => state.currentMenu.menu);
  const [logoName, logoUrl] = useSelector(
    (state) => state.currentMenu.siteName
  );
  const currentYear = new Date().getFullYear();

  return (
    <div className="menu-container">
      {/* eslint-disable-next-line */}
      {/* <div id="back-layer" className="back-layer" onClick={handleClose} />*/}
      <Paper
        id="sidemenu"
        elevation={0}
        // style={{ boxShadow: 'rgb(140 152 164 / 18%) 0px 0px 14px 0px' }}
        className="sidemenu"
      >
        <div className="logo">
          <Link to={logoUrl} className="">
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {logoName.toLowerCase()}
            </Typography>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/home">
            <Typography>Home</Typography>
          </Link>
        </div>
        {currentMenu.map((item) => (
          <div key={item.id} className="menu-item">
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
      </Paper>
    </div>
  );
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

export default SideMenu;
