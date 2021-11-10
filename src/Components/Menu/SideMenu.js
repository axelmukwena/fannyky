import { Paper, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { logoutUser } from '../../currentUser/logout'
import ModalDialog from '../Login/ModalDialog'

const SideMenu = () => {
  const currentMenu = useSelector((state) => state.currentMenu.menu)
  const history = useHistory()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleOpenForm = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleCloseForm = () => {
    setOpen(false)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    const success = logoutUser(dispatch)
    // https://reactrouter.com/web/api/Hooks/usehistory
    if (success) {
      history.replace(history.location.pathname)
    }
  }

  const currentUser = useSelector((state) => state.currentUser.user)
  const LoggedOut = () => {
    return (
      <Link to="/login" onClick={handleOpenForm} style={{ borderRadius: 5 }}>
        <Typography
          style={{
            fontWeight: 300,
          }}
        >
          Admin
        </Typography>
      </Link>
    )
  }

  const LoggedIn = () => {
    return (
      <Link to="/logout" onClick={handleLogout} style={{ borderRadius: 5 }}>
        <Typography
          style={{
            fontWeight: 300,
          }}
        >
          Logout
          {` ${currentUser.user.email.split('@')[0]}`}
        </Typography>
      </Link>
    )
  }

  const IsLoggedIn = () => {
    if (currentUser) {
      return <LoggedIn />
    }
    return <LoggedOut />
  }

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
        <Link to="/">
          <Typography
            style={{
              fontWeight: 900,
              fontSize: '1.4rem',
              fontFamily: 'Roboto',
              flex: 1,
              // cursor: 'pointer',
            }}
          >
            Budafans
          </Typography>
        </Link>
        <Link to="/explore">
          <Typography
            style={{
              fontWeight: 300,
            }}
          >
            Explore
          </Typography>
        </Link>
        {currentMenu.map((item) => (
          <Link to={item.slug} key={item.id}>
            <Typography
              style={{
                fontWeight: 300,
              }}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
        <IsLoggedIn />
        <Typography style={{}}>©{currentYear}. All rights reserved.</Typography>
        <ModalDialog open={open} handleClose={handleCloseForm} />
      </Paper>
    </div>
  )
}

export default SideMenu
