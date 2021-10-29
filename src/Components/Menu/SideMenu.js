import { MenuItem, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './SideMenu.css'

const SideMenu = ({ handleClose }) => {
  const currentMenu = useSelector((state) => state.currentMenu.menu)

  const history = useHistory()
  const handleClick = (url) => {
    handleClose()
    if (url) {
      history.replace(url)
    }
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div id="back-layer" className="back-layer" onClick={handleClose} />
      <div id="sidenav" className="sidenav">
        <MenuItem
          style={{ borderRadius: 5 }}
          onClick={() => handleClick(undefined)}
        >
          <IconButton style={{ padding: 0 }}>
            <Close style={{}} />
          </IconButton>
        </MenuItem>
        <MenuItem
          style={{ borderRadius: 5 }}
          onClick={() => handleClick('/explore')}
        >
          <Typography>Explore</Typography>
        </MenuItem>
        {currentMenu.map((item) => (
          <MenuItem
            style={{
              borderRadius: 5,
            }}
            onClick={() => handleClick(`/${item.slug}`)}
            key={item.id}
          >
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
      </div>
    </div>
  )
}

export default SideMenu