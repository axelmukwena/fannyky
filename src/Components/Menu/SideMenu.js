import { MenuItem, Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './SideMenu.css'

const SideMenu = ({ handleClose }) => {
  const currentMenu = useSelector((state) => state.currentMenu.menu)

  const history = useHistory()

  function handleClick(url) {
    handleClose()
    if (url) {
      if (url === 'explore') {
        history.push(`/${url}`)
      } else {
        history.push(url)
      }
    }
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div id="back-layer" className="back-layer" onClick={handleClose} />
      <Paper
        id="sidenav"
        elevation={0}
        style={{ boxShadow: 'rgb(140 152 164 / 18%) 0px 0px 14px 0px' }}
        className="sidenav"
      >
        <MenuItem
          style={{ borderRadius: 5 }}
          onClick={() => handleClick(undefined)}
        >
          <Typography
            style={{
              fontWeight: 300,
            }}
          >
            Close
          </Typography>
        </MenuItem>
        <MenuItem
          style={{ borderRadius: 5 }}
          onClick={() => handleClick('explore')}
        >
          <Typography
            style={{
              fontWeight: 300,
            }}
          >
            Explore
          </Typography>
        </MenuItem>
        {currentMenu.map((item) => (
          <MenuItem
            style={{
              borderRadius: 5,
            }}
            onClick={() => handleClick(`${item.slug}`)}
            key={item.id}
          >
            <Typography
              style={{
                fontWeight: 300,
              }}
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Paper>
    </div>
  )
}

export default SideMenu
