import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Menu as MenuIcon } from '@material-ui/icons'
import SideMenu from './SideMenu'

const useStyles = makeStyles(() => ({
  appBar: {
    margin: 0,
    position: 'static',
  },
  toolBar: {
    margin: '15px 10px 0 10px',
    display: 'flex',
    flexDirection: 'column',
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

  return (
    <div>
      <AppBar color="secondary" elevation={0} className={clsx(classes.appBar)}>
        <Toolbar className={clsx(classes.toolBar)}>
          <IconButton style={{ alignSelf: 'end' }} onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideMenu handleClose={handleClose} />
    </div>
  )
}

export default MainNav
