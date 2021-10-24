import { MenuItem, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import './SideMenu.css'

const SideMenu = ({ painters, handleClose }) => {
  const history = useHistory()

  const handleClick = (url) => {
    handleClose()
    if (url) {
      history.push(url)
    }
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div id="back-layer" className="back-layer" onClick={handleClose} />
      <div id="sidenav" className="sidenav">
        <MenuItem
          style={{
            paddingLeft: 30,
            borderBottom: '1px solid rgb(16 16 16)',
            color: 'white',
          }}
          value={undefined}
          onClick={handleClick}
        >
          <IconButton style={{ padding: 0 }}>
            <Close style={{ color: 'white' }} />
          </IconButton>
        </MenuItem>
        <MenuItem
          style={{
            color: 'white',
            paddingLeft: 30,
            borderBottom: '1px solid rgb(16 16 16)',
            fontWeight: 500,
          }}
          value={undefined}
          onClick={handleClick}
        >
          View all
        </MenuItem>
        {painters.map((painter) => (
          <MenuItem
            style={{
              color: 'white',
              paddingLeft: 30,
              borderBottom: '1px solid rgb(16 16 16)',
              fontWeight: 500,
            }}
            onClick={() => handleClick(painter.slug)}
            key={painter.id}
          >
            {painter.name}
          </MenuItem>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
