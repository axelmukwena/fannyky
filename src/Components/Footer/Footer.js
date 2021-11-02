import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Typography, Toolbar, AppBar, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ModalDialog from '../Login/ModalDialog'
import { logoutUser } from '../../currentUser/logout'

const useStyless = makeStyles(() => ({
  topBar: {
    bottom: 0,
    top: 'auto',
    position: 'fixed',
    zIndex: -2,
  },
  typography: {
    fontSize: '0.8rem',
    color: '#444',
    flexGrow: 1,
    textAlign: 'center',
  },
  toolBar: {
    minHeight: 50,
  },
  button: {
    textTransform: 'none',
    padding: 0,
    marginBottom: 4,
    minWidth: 50,
  },
}))

const Footer = () => {
  const classes = useStyless()
  const currentYear = new Date().getFullYear()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    const success = logoutUser(dispatch)
    // https://reactrouter.com/web/api/Hooks/usehistory
    if (success) {
      history.push('/')
    }
  }

  const LoggedOut = () => (
    <Button className={classes.button} onClick={handleOpen}>
      <p
        style={{ textDecoration: 'underline', marginTop: 2 }}
        className={classes.typography}
      >
        admin
      </p>
    </Button>
  )

  const LoggedIn = () => (
    <span>
      <Button className={classes.button} onClick={handleLogout}>
        <p
          style={{ textDecoration: 'underline', marginTop: 2 }}
          className={classes.typography}
        >
          logout
        </p>
      </Button>
      <span> {currentUser.user.email.split('@')[0]}</span>
    </span>
  )

  let currentUser = useSelector((state) => state.currentUser.user)
  const IsLoggedIn = () => {
    if (currentUser) {
      return <LoggedIn />
    }
    return <LoggedOut />
  }

  return (
    <AppBar color="secondary" elevation={0} className={clsx(classes.topBar)}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.typography}>
          © {currentYear}. All rights reserved. <IsLoggedIn />
        </Typography>
      </Toolbar>
      <ModalDialog open={open} handleClose={handleClose} />
    </AppBar>
  )
}

export default Footer
