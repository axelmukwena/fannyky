import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core'
import clsx from 'clsx'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SideMenu from './SideMenu'
import './Menu.css'

const useStyles = makeStyles(() => ({
  appBar: {
    margin: 0,
    position: 'static',
  },
  typography: {
    fontWeight: 500,
    fontSize: '1.2rem',
    color: '#444',
    textDecoration: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
}))

const MainNav = () => {
  const classes = useStyles()
  const siteName = useSelector((state) => state.currentMenu.siteName)
  const history = useHistory()

  const handleOpen = () => {
    document.getElementById('sidenav').style.minWidth = '200px'
    document.getElementById('back-layer').style.display = 'block'
    document.getElementById('sidenav').style.padding = '1.5em'
  }

  const handleClose = () => {
    document.getElementById('sidenav').style.minWidth = '0'
    document.getElementById('back-layer').style.display = 'none'
    document.getElementById('sidenav').style.padding = '0'
  }

  const handleClick = () => {
    history.push('/explore')
  }

  return (
    <div className="main-nav">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="secondary"
          elevation={0}
          className={clsx(classes.appBar)}
        >
          <Toolbar className="toolbar">
            <Typography
              onClick={handleClick}
              style={{
                fontWeight: 900,
                fontSize: '1.4rem',
                fontFamily: 'Roboto',
                flex: 1,
                // cursor: 'pointer',
              }}
            >
              {siteName}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              style={{ marginTop: 3 }}
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <SideMenu handleClose={handleClose} />
    </div>
  )
}

export default MainNav
