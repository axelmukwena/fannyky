import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { getPublicData } from '../../utils/Helpers'
import { parsePainterMenu, updateMenuSlice } from '../Menu/menuSlice/updateMenu'
import Books from './Books'
import Exhibitions from './Exhibitions'
import Paintings from './Paintings'
import './Painter.css'
import { updatePainter } from './painterSlice/currentPainterSlice'
import { updateSiteName } from '../Menu/menuSlice/currentMenuSlice'

const Painter = ({ match }) => {
  const dispatch = useDispatch()

  // paths
  // paintings => /painter
  // exhibitions => /painter/exhibitions
  // books => /painter/books
  // about => /painter/about

  // If painter updated, set painter menu
  // parsePainterMenu(painterName, aboutSlug, paintingsSlug, exhibSlug, booksSlug)
  function setPainter(painter) {
    if (painter) {
      const menu = parsePainterMenu(
        `${match.url}/about`,
        `${match.url}`,
        `${match.url}/exhibitions`,
        `${match.url}/books`,
      )
      updateMenuSlice(dispatch, menu)
      dispatch(updatePainter(painter))
      dispatch(updateSiteName(`Paintings by ${painter.name}`))
    }
  }

  useEffect(() => {
    getPublicData(setPainter, match.url)
  }, [])

  return (
    <div className="painter">
      <Switch>
        <Route
          path={`${match.url}/exhibitions`}
          component={Exhibitions}
          key="exhibitions"
        />
        <Route path={`${match.url}/books`} component={Books} key="books" />
        <Route path={match.url} component={Paintings} key="paintings" />
      </Switch>
    </div>
  )
}

export default Painter
