import { MenuItem, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import './SideMenu.css'

const SideMenu = ({ handleClose }) => (
  <div>
    {/* eslint-disable-next-line */}
    <div id="back-layer" className="back-layer" onClick={handleClose} />
    <div id="sidenav" className="sidenav">
      <MenuItem
        style={{
          paddingLeft: 30,
          borderBottom: '1px solid rgb(16 16 16)',
        }}
        onClick={handleClose}
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
        }}
        onClick={handleClose}
      >
        View all
      </MenuItem>
      <MenuItem
        style={{
          color: 'white',
          paddingLeft: 30,
          borderBottom: '1px solid rgb(16 16 16)',
        }}
        onClick={handleClose}
      >
        Fanny Wong
      </MenuItem>
      <MenuItem
        style={{
          color: 'white',
          paddingLeft: 30,
          borderBottom: '1px solid rgb(16 16 16)',
        }}
        onClick={handleClose}
      >
        Ky Leung
      </MenuItem>
    </div>
  </div>
)

export default SideMenu
