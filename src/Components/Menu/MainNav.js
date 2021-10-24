import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Menu as MenuIcon } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SideMenu from './SideMenu'
import { apiURL } from '../../utils/Helpers'

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
  const [painters, setPainters] = useState([])

  const handleOpen = () => {
    console.log(painters)
    document.getElementById('sidenav').style.width = '250px'
    document.getElementById('back-layer').style.display = 'block'
  }

  const handleClose = () => {
    document.getElementById('sidenav').style.width = '0'
    document.getElementById('back-layer').style.display = 'none'
  }

  async function getMenuData() {
    // Data
    const url = apiURL('/')
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios
      .get(url, headers)
      .then(function (response) {
        setPainters(response.data)
      })
      .catch(function (error) {
        console.log('Get Painters Error')
        console.log(error)
      })
  }

  useEffect(() => {
    console.log(getMenuData())
  }, [])

  return (
    <div>
      <AppBar color="secondary" elevation={0} className={clsx(classes.appBar)}>
        <Toolbar className={clsx(classes.toolBar)}>
          <IconButton style={{ alignSelf: 'end' }} onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
          <div>
            {painters.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <SideMenu handleClose={handleClose} />
    </div>
  )
}

export default MainNav
